import { Field } from "./Field";
import { Value } from "../value/Value";
/**
 * 输入字段
 */
export class InputField extends Field {
  constructor(field) {
    super(field);
    const { value } = field;
    /**
     * 设置默认值
     */
    this.setElement('value', new Value(value));
    /**
     * 添加映射
     */
    this.defineValue();
  }

  /**
     * 添加取值映射
     */
  defineValue() {
    this.defineElementMapping('value', () => {
      const { value } = this.valuePointer.value;
      return {
        value,
        display: value
      }
    })
  }
  /**
   * 设置新值
   */
  setValue(value) {
    const pointer = this.valuePointer;
    pointer.value = new Value({ value });
  }
}