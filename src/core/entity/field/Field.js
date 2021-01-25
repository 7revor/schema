import { Tag } from "../../base/Tag";
import { FieldType, isLegalFieldType } from '../Constant';
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
import { ValueField } from "../value/ValueField";

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
    if (rules) {
      this.setElement('rules', new Rules(rules, this));
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
    const isMultiComponent = this.isMultiComponent();
    const valueField = this.valueField;
    if (valueField) {
      if (valueField instanceof ValueFieldList) valueField.push(field)
      else throw new Error('ValueField set duplicate!')
    } else {
      if (!isMultiComponent) this.define('valueField', field, true);
      else this.define('valueField', new ValueFieldList(field), true);
    }
  }

  removeValueField(value) {
    const valueField = this.valueField;
    if (!valueField) throw new Error('ValueField not exist!');
    if (valueField instanceof ValueFieldList) {
      const index = valueField.indexOf(value);
      if (index === -1) throw new Error('valueField not found!');
      valueField.splice(index, 1);
    } else {
      this.define('valueField', null, true)
    }
  }

  getValueField() {
    return this.isRoot() ? this.getElement() : this.valueField;
  }

  /**
   * 是否为顶级field
   */
  isRoot() {
    return !this.parent
  }

  /**
   * 获取顶级field
   */
  getRoot() {
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
  /**
   * 是否为MultiComplex字段的组成部分
   */
  isMultiComponent() {
    let parent = this;
    let isMultiComponent = false;
    while (parent.parent && !isMultiComponent) {
      parent = parent.parent;
      isMultiComponent = parent.type === FieldType.MULTI_COMPLEX;
    }
    return isMultiComponent
  }
}

