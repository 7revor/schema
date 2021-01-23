import { Field, ValueFieldList } from "./Field";
import { Options } from "../Option";
import { Value } from "../value/Value";
import { ValueField } from "../value/ValueField";

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
      if (valueField instanceof ValueField) return valueField.getValue();
      if (valueField instanceof ValueFieldList) {
        return [...valueField.map(field => field.getValue())]
      } else {
        return {
          value: valueField.value.value,
          display: valueField.value.value ? this.optionMap.get(valueField.value.value) : null
        }
      }
    })
  }

  setValue(value) {
    const valueField = this.getValueField();
    if (valueField instanceof ValueFieldList) throw new Error('MultiComplex field could not set value alone!')
    valueField.value.setValue(value);
  }
}