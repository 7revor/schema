import { Tag, TagGroup } from "../../base/Tag";
import { Value, Values } from './Value';
import { Type } from "../Type";
/**
 * field标签
 */
export class ComplexValue extends Tag {
  constructor(complex) {
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
        v = new ComplexValueGroup(value);
        break;
      case "multiComplex":
        v = new ComplexValuesGroup(value);
    }
    this.setElement('value', v, () => this.$inner.element.value.value);
  }
}
/**
 * complex-value 标签
 */
export class ComplexValueGroup extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValue, ComplexValue, values);
  }
}
/**
 * complex-values标签
 */
export class ComplexValues extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValues, ComplexValue, values)
  }
}
/**
 * complex-values的集合(虚拟)
 */
export class ComplexValuesGroup extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValuesGroup, ComplexValues, values);
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
   * complexValues
   */
  if (parent.type === Type.MULTI_COMPLEX) {
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
  } else {
    if (parent.type === Type.COMPLEX) {
      if (complexValue && complexValue[0].field) {  // 旧版schema解包为了 complex-values
        complexValue = complexValue[0].field
      }
    }
    /**
     * complexValue
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
  }
}
