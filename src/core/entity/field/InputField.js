import { Field, ValueFieldList } from "./Field";
import { Value } from "../value/Value";
import { ValueField } from "../value/ValueField";
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
      const valueField = this.getValueField();
      if (valueField instanceof ValueField) return valueField.getValue();  // 子类目
      else if (valueField instanceof ValueFieldList) {                     // multi子类目
        return [...valueField.map(field => field.getValue())]
      } else {                                                             // 顶级类目
        return {
          value: valueField.value.value,
          display: valueField.value.value
        }
      }
    })
  }
  /**
   * 设置新值
   */
  setValue(value) {
    const valueField = this.getValueField();
    if (valueField instanceof ValueFieldList) throw new Error('MultiComplex field could not set value alone!');
    valueField.value.setValue(value);
  }
}