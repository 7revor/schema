import { Tag, TagGroup } from "../../base/Tag";
import { Value, Values } from './Value';
import { Type } from "../Type";
/**
 * field标签
 */
export class ValueField extends Tag {
  constructor(complex, field) {
    if (field.id !== complex.id) field = field.fields.find(f => f.id === complex.id);
    super(Tag.Tags.Field);
    const { id, name, type, value } = complex;
    this.setAttr('id', id, true);
    this.setAttr('name', name, true);
    this.setAttr('type', type, true);
    let v;
    switch (type) {
      case "input":
      case 'singleCheck':
        v = new Value(value);
        break;
      case "multiCheck":
        v = new Values(value);
        break;
      case "complex":
        v = new ComplexValueGroup(value, field);
        break;
      case "multiComplex":
        v = new ComplexValuesGroup(value, field);
    }
    this.define('field', field);                        // 值->字段 映射
    field.setValueField(this);
    this.setElement('value', v, () => this.$inner.element.value.value);
  }
}
/**
 * complex-value 标签
 */
export class ComplexValueGroup extends TagGroup {
  constructor(values, parent) {
    super(TagGroup.Tags.ComplexValue, ValueField, values, parent);
  }
}
/**
 * complex-values标签
 */
export class ComplexValues extends TagGroup {
  constructor(values, parent) {
    super(TagGroup.Tags.ComplexValues, ValueField, values, parent)
  }
}
/**
 * complex-values的集合(虚拟)
 */
export class ComplexValuesGroup extends TagGroup {
  constructor(values, parent) {
    super(TagGroup.Tags.ComplexValuesGroup, ComplexValues, values, parent);
  }
}
/**
* 递归设置默认值
* @param {*} target 目标
* @param {*} field 字段
* @param {*} complexValue 已有值 
*/
export function recursionValue(target, parent, complexValue) {
  const { fields } = parent;
  if (!fields) return;
  /**
   * complexValue
   */
  if (parent.type !== Type.MULTI_COMPLEX) {
    if (parent.type === Type.COMPLEX) {
      if (complexValue && complexValue[0].field) {  // 旧版schema解包为了 complex-values
        complexValue = complexValue[0].field
      }
    }
    /**
     * complexValues
     */
    if (!complexValue) complexValue = [];
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const value = complexValue.find(value => value.id === field.id) || {};
      const defaultValueField = { id: field.id, name: field.name, type: field.type };
      if (field.type === Type.COMPLEX || field.type === Type.MULTI_COMPLEX) {
        defaultValueField.value = [];    // 初始化值
        recursionValue(defaultValueField.value, field, value.complexValue || value.complexValues);
      } else {
        defaultValueField.value = value.value || value.values
      }
      target.push(defaultValueField)
    }
  } else {
    const complexValues = complexValue ? complexValue.map(c => c.field || c) : []; // 服务端解包(二维数组)
    if (!complexValues.length) complexValues.push([]);                             // 预设默认值
    for (let i = 0; i < complexValues.length; i++) {                               // 遍历值的每一项
      const group = [];
      const complexValuesItem = complexValues[i];
      for (let i = 0; i < fields.length; i++) {                               // 二层遍历
        const field = fields[i];
        const value = complexValuesItem.find(value => value.id === field.id) || {};
        const init = { id: field.id, name: field.name, type: field.type };
        if (field.type === Type.COMPLEX || field.type === Type.MULTI_COMPLEX) {
          init.value = [];                                                    // 初始化值
          recursionValue(init.value, field, value.complexValue || value.complexValues);
        } else {
          init.value = value.value || value.values
        }
        group.push(init)
      }
      target.push(group)
    }

  }
}
