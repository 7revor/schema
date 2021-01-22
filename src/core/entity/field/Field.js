import { Tag } from "../../base/Tag";
import { isLegalFieldType } from '../Constant';
import { Rules } from '../rule/Rules';
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
    if (rules) {
      this.setElement('rules', new Rules(rules), true);
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
    if (!this.rules) return true;
    const msg = [];
    for (let rule of this.rules) {
      const info = rule.validate(value || valueField.value);
      info && msg.push(info);
    }
    return msg
  }
}

