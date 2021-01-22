import { Field, ValueFieldList } from "./Field";
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
    }
    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (valueField instanceof ValueFieldList) {
        return [...valueField.map(field => {
          return {
            value: field.value.value,
            display: this.optionMap.get(field.value.value),
            inputValue: field.value.inputValue
          }
        })]
      } else {
        return {
          value: field.value.value,
          display: field.value.value ? this.optionMap.get(field.value.value) : null
        }
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