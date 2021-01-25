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
    if (this.isRoot()) {
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
      if (valueField instanceof ValueField) return valueField.toJSON();
      if (valueField instanceof ValueFieldList) {
        return [...valueField.map(field => field.toJSON())]
      } else {
        return {
          ...valueField.value,
          display: valueField.value.value ? this.optionMap.get(valueField.value.value) : null
        }
      }
    })
  }

  setValue(value) {
    const valueField = this.getValueField();
    if (this.isMultiComponent()) throw new Error('MultiComplex\'s child field could not set value alone! Please get complexValueTemplate from parent multi field first！');
    valueField.value.setValue(value);
  }
}