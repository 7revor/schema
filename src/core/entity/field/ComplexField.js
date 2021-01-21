import { Fields, getFieldClass } from "./index";
import { ComplexValueGroup } from "../value/ComplexValue";
import { Field } from "./Field";

export class ComplexField extends Field {
  constructor(field) {
    super(field);
    let { fields, complexValue } = field;
    /**
     * 未初始化默认值
     */
    if (!complexValue) {
      complexValue = fields.map(field => ({ id: field.id, name: field.name, type: field.type }))
    }
    this.define('fieldMap', new Map());
    this.setElement('complexValue', new ComplexValueGroup(complexValue));
    /**
     * 添加映射
     */
    this.$inner.element.complexValue.forEach(complex => {
      this.fieldMap.set(complex.id, complex)
    })
    /**
     * 初始化子属性
     */
    const fieldList = new Fields();
    for (let field of fields) {
      const Clazz = getFieldClass(field.type);
      const instance = new Clazz(field);
      const valueField = this.fieldMap.get(instance.id);
      instance.defineValuePointer(valueField.$inner.element);
      fieldList.push(instance)
    }
    this.setElement('fields', fieldList, true);
  }
}