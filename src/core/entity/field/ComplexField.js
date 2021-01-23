import { Fields } from "./Fields";
import { ComplexValueGroup, recursionValue } from "../value/ValueField";
import { Field, ValueFieldList } from "./Field";
/**
 * 复杂类型
 */
export class ComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    let { fields, complexValue, complexValues } = field;
    /**
     * 初始化子属性
     */
    this.setElement('fields', new Fields(fields, this), true);
    /**
    * 顶级字段
    */
    if (this.isRoot()) {
      /**
       * 递归设置默认值
       */
      const initValue = [];
      recursionValue(initValue, this, complexValue || complexValues);
      /**
        * 设置初始值（顶级字段映射）
        */
      this.setElement('value', new ComplexValueGroup(initValue, this));
    }
    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if(!valueField) return [];
      if (valueField instanceof ValueFieldList) {  // 含有嵌套complex-values
        return [...valueField.map(field => ({ id: field.id, name: field.name, value: field.toJSON() }))];
      } else {
        const valueList = [];
        for (let field of valueField.value) {
          valueList.push({ id: field.id, name: field.name, value: field.toJSON() })
        }
        return valueList
      }
    })
  }
}