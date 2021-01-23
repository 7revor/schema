import { Tag } from "../../base/Tag";
import { isLegalFieldType } from '../Constant';
import { MaxLengthRule, MinLengthRule } from "../rule/LengthRule";
import { MaxNumRule, MinNumRule } from "../rule/NumRule";
import { ReadOnlyRule } from "../rule/ReadOnlyRule";
import { RequiredRule } from "../rule/RequiredRule";
import { Rules } from '../rule/Rules';
import { DevTipRule, TipRule } from "../rule/TipRule";
import { ValueAttributeRule } from "../rule/ValueAttributeRule";
import { MaxValueRule, MinValueRule } from "../rule/ValueRule";
import { ValueTypeRule } from "../rule/ValueTypeRule";
import { Value } from "../value/Value";

export class ValueFieldList extends Array { }
/**
 * 标准Field基类
 */
export class Field extends Tag {
  constructor(field, parent) {
    super(Tag.Tags.Field);
    /**
     * 初始化属性
     */
    this.initProperty(field);
    /**
     * 初始化级联关系
     */
    this.initRelation(parent)
  }

  /**
   * 初始化属性
   */
  initProperty(field) {
    const { id, name, type, rules } = field;
    /**
     * 用于描述唯一主键，以商品的标题为例，id=“title”。
     */
    if (!id) throw new Error('Field must contain id property!');
    this.setAttr('id', id, true);
    /**
     * 用于描述field的显示名，以商品的标题为例，name=“商品标题”。
     */
    this.setAttr('name', name, true);
    /**
     * 用于描述field的值的数据输入类型，schema结构对于field定义了七种类型，分别为input、multiInput、singleCheck、multiCheck、complex、multiComplex和label。详见Type
     */
    if (!isLegalFieldType(type)) throw new Error(`Field type ${type} is not legal!`);
    this.setAttr('type', type, true);
    /**
     * 用于描述field的各类系统或者业务规则。详见Rule说明
     */
    this.initRule(rules);
  }
  /**
   * 初始化规则选项
   */
  initRule(rules) {
    const ruleInfo = {};
    this.define('rule', ruleInfo, false, true);
    if (this.type === 'input') ruleInfo.isInput = true;
    if (rules) {
      this.setElement('rules', new Rules(rules));
      for (let rule of this.getElement().rules) {
        if (rule instanceof ValueTypeRule) {
          const target = rule.getTarget();
          if (!ruleInfo.type) ruleInfo.type = {};
          ruleInfo.type[target] = rule.value;
        }
        if (rule instanceof ReadOnlyRule && rule.value === 'true') {
          ruleInfo.isReadOnly = true
        }
        if (rule instanceof RequiredRule && rule.value === 'true') {
          ruleInfo.isRequired = true
        }
        if (rule instanceof MaxNumRule) {
          ruleInfo.maxNum = parseInt(rule.value);
        }
        if (rule instanceof MinNumRule) {
          ruleInfo.minNum = parseInt(rule.value);
        }
        if (rule instanceof MaxLengthRule) {
          ruleInfo.maxLength = parseInt(rule.value);
        }
        if (rule instanceof MinLengthRule) {
          ruleInfo.minLength = parseInt(rule.value);
        }
        if (rule instanceof MaxValueRule) {
          const num = parseInt(rule.value);
          if (!isNaN(num)) {
            ruleInfo.maxValue = num;
          }
        }
        if (rule instanceof MinValueRule) {
          ruleInfo.minValue = parseInt(rule.value);
        }
        if (rule instanceof ValueAttributeRule) {
          if (!ruleInfo.valueAttribute) ruleInfo.valueAttribute = [];
          ruleInfo.valueAttribute.push(rule.value);
          if (rule.value === 'inputValue') ruleInfo.isInput = true;
        }
        if (rule instanceof TipRule) {
          if (!ruleInfo.tip) ruleInfo.tip = [];
          if (rule.value === '请使用SelectProp接口查询并填充完整子属性后提交') {
            ruleInfo.isCascade = true;
          } else {
            ruleInfo.tip.push(rule.value)
          }
        }
        if (rule instanceof DevTipRule) {
          if (!ruleInfo.devTip) ruleInfo.devTip = [];
          ruleInfo.devTip.push(rule.value)
        }
      }
    }
  }

  /**
   * 初始化级联关系
   * @param {*} parent 
   */
  initRelation(parent) {
    if (parent) {
      this.define('parent', parent);                // 定义父类
    }
  }

  setValueField(field) {
    const valueField = this.valueField;
    if (valueField) {
      if (valueField instanceof ValueFieldList) valueField.push(field)
      else {
        const list = new ValueFieldList();
        list.push(valueField, field);
        this.define('valueField', list, true)
      }
    } else {
      this.define('valueField', field, true)
    }
  }

  getValueField() {
    return this.isTopest() ? this.getElement() : this.valueField;
  }

  /**
   * 是否为顶级field
   */
  isTopest() {
    return !this.parent
  }

  /**
   * 获取顶级field
   */
  getAncestor() {
    let parent = this;
    while (parent.parent) parent = parent.parent;
    return parent
  }
  /**
   * 校验方法
   */
  validate(value) {
    if (value && !(value instanceof Value)) throw new Error('Field value received Value type Only!')
    const valueField = this.getValueField();
    if (!this.rules) return [];
    const msg = [];
    for (let rule of this.rules) {
      const info = rule.validate(value || valueField.value);
      info && msg.push(info);
    }
    return msg
  }
}

