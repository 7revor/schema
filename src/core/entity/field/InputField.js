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
    if (this.isRoot()) {
      const { value } = field;
      /**
        * 设置默认值
        */
      this.setElement('value', new Value(value, this));
    }

    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (!valueField) return this.isMultiComponent() ? [] : { value: null, display: null };
      if (valueField instanceof ValueField) return valueField.toJSON();    // 子类目
      if (valueField instanceof ValueFieldList) {                     // multi子类目
        return [...valueField.map(field => field.toJSON())]
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
    if (this.isMultiComponent()) throw new Error('MultiComplex\'s child field could not set value alone! Please get complexValueTemplate from parent multi field first！');
    const valueField = this.getValueField();
    if (valueField instanceof ValueField) {
      this.valueField.setValue(new Value(value, this));
    } else {
      this.setElement('value', new Value(value, this));
    }
  }
}