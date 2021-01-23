import { Field, ValueFieldList } from "./Field";
import { Options } from "../Option";
import { Values, Value } from "../value/Value";

export class MultiCheckField extends Field {
  constructor(field, parent) {
    super(field, parent);
    const { options, values } = field;
    /**
     * 选项映射
     */
    this.define('optionMap', new Map());
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
    }
    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (valueField instanceof ValueFieldList) return valueField.getValue();
      if (valueField instanceof ValueFieldList) {
        return [...valueField.map(field => field.getValue())]
      } else {
        return [...valueField.value.map(({ value, inputValue }) => {
          return {
            value,
            inputValue,
            display: this.optionMap.get(value),
          }
        })]
      }
    })

  }
  /**
   * 添加选项
   */
  addValue(value) {
    const valueField = this.getValueField();
    if (valueField instanceof ValueFieldList) throw new Error('MultiComplex field could not set value alone!');
    if (!valueField.value.find(v => v.value === value)) {
      valueField.value.push(new Value({ value }));
    }
  }
  /**
   * 删除选项
   */
  removeValue(value) {
    const valueField = this.getValueField();
    if (valueField instanceof ValueFieldList) throw new Error('MultiComplex field could not remove value alone!');
    const index = valueField.value.findIndex(v => v.value === value);
    valueField.value.splice(index, 1);
  }
}