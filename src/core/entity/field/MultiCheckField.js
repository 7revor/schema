import { Field, ValueFieldList } from "./Field";
import { Options } from "../Option";
import { Values, Value } from "../value/Value";
import { ValueField } from '../value/ValueField'

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
    if (this.isRoot()) {
      this.setElement('value', new Values(values, this));
    }
    /**
      * 添加映射(只有顶级字段含有value信息)
      */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (!valueField) return [];
      if (valueField instanceof ValueField) return valueField.toJSON();
      if (valueField instanceof ValueFieldList) {
        return [...valueField.map(field => field.toJSON())]
      } else {
        return [...valueField.value.map(field => {
          return {
            ...field.value,
            display: this.optionMap.get(field.value.value),
          }
        })]
      }
    })
  }
  /**
   * 添加选项
   */
  addValue(value) {
    if (this.isMultiComponent()) throw new Error('MultiComplex\'s child field could not addValue value alone! Please get complexValueTemplate from parent multi field first！');
    const valueField = this.getValueField();
    if (value.value > 0) {  // 选项
      if (!valueField.value.find(v => v.value === value.value)) { // 无现有值
        const legal = this.optionMap.get(value.value);
        if (!legal) throw new Error('option ' + value.value + ' not exist!')
        valueField.value.push(new Value(value, this));
      } else {
        throw new Error('value ' + value.value + ' is already exist!')
      }
    } else {        // 自定义输入
      if (!this.rule.isInput) throw new Error('Field ' + this.name + ' is not input!');
      valueField.value.push(new Value(value, this));
    }
  }
  /**
   * 删除选项
   */
  removeValue(value) {
    if (this.isMultiComponent()) throw new Error('MultiComplex\'s child field could not removeValue value alone! Please get complexValueTemplate from parent multi field first！');
    const valueField = this.getValueField();
    const index = valueField.value.findIndex(v => v.value === value);
    valueField.value.splice(index, 1);
  }
}