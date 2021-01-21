import { Field } from "./Field";
import { Options } from "../Option";
import { Value } from "../value/Value";

export class SingleCheckField extends Field {
  constructor(field) {
    super(field);
    const { options, value } = field;
    this.define('optionMap', new Map())
    /**
     * 选项
     */
    if (options) {
      const opts = new Options(options);
      this.setElement('options', opts, true);
      opts.forEach(opt => this.optionMap.set(opt.value, opt.displayName))
    }
    /**
     * 设置默认值
     */
    this.setElement('value', new Value(value));
    /**
     * 添加取值映射
     */
    this.defineValue();
  }
  /**
    * 添加取值映射
    */
  defineValue() {
    this.defineElementMapping('value', () => {
      const { value, inputValue } = this.valuePointer.value || {};
      if (!value) return { value: null, display: null };
      return {
        value,
        inputValue,
        display: inputValue || this.optionMap.get(value),
      }
    })
  }

  setValue(value) {
    const pointer = this.valuePointer;
    const result = this.optionMap.get(value);
    if (!result) throw new Error(`Option ${value} not exist!`);
    pointer.value = new Value({ value })
  }
}