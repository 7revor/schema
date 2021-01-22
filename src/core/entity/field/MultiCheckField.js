import { Field } from "./Field";
import { Options } from "../Option";
import { Values, Value } from "../value/Value";

export class MultiCheckField extends Field {
  constructor(field, parent) {
    super(field, parent);
    const { options, values } = field;
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
      this.setElement('value', new Values(values));
      this.defineElementMapping('value', () => {
        const values = this.getElement().value;
        if (!values) return [];
        return [...values.map(({ value }) => {
          return {
            value,
            display: this.optionMap.get(value),
          }
        })]
      })
    }

  }
  /**
   * 添加选项
   */
  addValue(value) {
    const pointer = this.valuePointer;
    const result = this.optionMap.get(value);
    if (!result) throw new Error(`Option ${value} not exist!`);
    if (pointer.values.find(v => v.value === value)) return;
    pointer.values.push(new Value({ value }))
  }
  /**
   * 删除选项
   */
  removeValue(value) {
    const pointer = this.valuePointer;
    const index = pointer.values.findIndex(v => v.value === value);
    if (index === -1) throw new Error(`Option ${value} not exist!`);
    pointer.values.splice(index, 1);
  }
}