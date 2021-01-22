import { Field, ValueFieldList } from "./Field";
import { Value } from "../value/Value";
/**
 * 输入字段
 */
export class InputField extends Field {
  constructor(field, parent) {
    super(field, parent);
    /**
     * 顶级字段，直接含有value属性
     */
    if (this.isTopest()) {
      const { value } = field;
      /**
        * 设置默认值
        */
      this.setElement('value', new Value(value, this.rules));
    }

    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valieField = this.getValueField();
      if (valieField instanceof ValueFieldList) {
        return [...valieField.map(field => ({ value: field.value.value, display: field.value.value }))]
      } else {
        return {
          value: valieField.value.value,
          display: valieField.value.value
        }
      }
    })
  }
  /**
   * 设置新值
   */
  setValue(value) {

  }
}