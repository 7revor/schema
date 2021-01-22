import { Field } from "./Field";
import { Options } from "../Option";
import { Value } from "../value/Value";

export class SingleCheckField extends Field {
  constructor(field, parent) {
    super(field, parent);
    const { options, value } = field;
    /**
     * 选项映射
     */
    this.define('optionMap', new Map())
    /**
     * 选项
     */
    if (options) {
      const opts = new Options(options);
      this.setElement('options', opts, true);
      opts.forEach(opt => this.optionMap.set(opt.value, opt.displayName))
    }
    if (this.isTopest()) {
      /**
        * 设置默认值
        */
      this.setElement('value', new Value(value, this.rules));
      this.defineElementMapping('value', () => {
        const { value } = this.getElement().value;
        if (!value) return { value: null, display: null };
        return {
          value,
          display: this.optionMap.get(value),
        }
      })
    }

  }

  setValue(value) {
    const pointer = this.valuePointer;
    const result = this.optionMap.get(value);
    if (!result) throw new Error(`Option ${value} not exist!`);
    pointer.value = new Value({ value })
  }
}