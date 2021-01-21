import { Field } from "./Field";
import { Fields, getFieldClass } from "./index";

import { ComplexValuesGroup } from '../value/ComplexValue';
/**
 * 每一个complexValues都必须包含所有field中的字段
 */
export class MultiComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    let { fields, complexValues } = field;
    this.setElement('complexValuesGroup', new ComplexValuesGroup(complexValues ? complexValues.map(complex => complex.field) : []));  // 后台多包了一层field，这里直接解包
    /**
     * 初始化子属性
     */
    const fieldList = new Fields();
    fields.forEach((field) => {
      const Clazz = getFieldClass(field.type);
      const instance = new Clazz(field, this);  // 子字段实例
      fieldList.push(instance)
    })
    this.setElement('fields', fieldList, true);
    this.defineValue();
  }
  /**
    * 添加取值映射
    */
  defineValue() {
    this.defineElementMapping('value', () => {
      const complexValuesGroup = this.valuePointer.complexValuesGroup;
      if (!complexValuesGroup) return [];
      const result = [];
      complexValuesGroup.forEach(complexValuesFields => {
        const obj = {};
        complexValuesFields.forEach(complexValuesField => {
          if (Array.isArray(complexValuesField.value)) {
            obj[complexValuesField.id] = [...complexValuesField.value.map(v => v.value.value)];
          } else {
            obj[complexValuesField.id] = complexValuesField.value.value
          }
        })
        result.push(obj)
      })
      return result;
    })
  }
}