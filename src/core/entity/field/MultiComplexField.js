import { Field, ValueFieldList } from "./Field";
import { Fields } from "./Fields";
import { ComplexValuesGroup, recursionValue, ValueField } from "../value/ValueField";

/**
 * 每一个complexValues都必须包含所有field中的字段
 * multiComplex具有特殊修改方法，用于修改指定下标的数据
 */
export class MultiComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    let { fields, complexValues } = field;
    /**
     * 初始化子属性
     */
    this.setElement('fields', new Fields(fields, this), true);
    /**
      * 顶级字段
      */
    if (this.isTopest()) {
      /**
       * 递归设置默认值
       */
      const initValue = [];
      recursionValue(initValue, this, complexValues)
      /**
        * 设置初始值（顶级字段映射）
        */
      this.setElement('value', new ComplexValuesGroup(initValue, this));
    }
    /**
     * 添加映射(只有顶级字段含有value信息)
     */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (valueField instanceof ValueFieldList) {           // 含有嵌套complex-values
        return [...valueField.map(field => ({ id: field.id, name: field.name, value: field.getValue() }))];
      } else {
        const valueList = [];
        for (let complexValueGroup of valueField.value) {
          const value = [];
          for (let complexValue of complexValueGroup) {
            value.push({ id: complexValue.id, name: complexValue.name, value: complexValue.getValue() })
          }
          valueList.push(value);
        }
        return valueList
      }
    })
  }
}