import { Fields, getFieldClass } from "./index";
import { ComplexValue } from "../value/ComplexValue";
import { Field } from "./Field";

export class ComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    this.define('fieldMap', new Map());
    let { fields, complexValue } = field;
    /**
     * 未初始化默认值
     */
    if (!complexValue) {
      complexValue = fields.map(field => ({ id: field.id, name: field.name, type: field.type }))
    }
    this.setElement('value', new ComplexValue(complexValue));
    /**
     * 添加映射
     */
    this.$inner.element.value.forEach(complex => {
      this.fieldMap.set(complex.id, complex)
    })
    /**
     * 初始化子属性
     */
    const fieldList = new Fields();
    for (let field of fields) {
      const Clazz = getFieldClass(field.type);
      const instance = new Clazz(field, this);
      const valueField = this.fieldMap.get(instance.id);
      instance.defineValuePointer(valueField.$inner.element);  // 这里要拿到value xml 子节点的引用
      fieldList.push(instance)
    }
    this.setElement('fields', fieldList, true);
    this.defineValue();
  }

  defineValue() {
    this.defineElementMapping('value', () => {
      return [...this.fields.map(field => {
        return {
          id: field.id,
          name: field.name,
          value: field.value
        }
      })];
    })
  }
}