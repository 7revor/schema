import { Rule } from "./Rule";

export class MaxLengthRule extends Rule {
  constructor(rule,field) {
    super(rule,field);
    this.setAttr('exProperty', rule.exProperty, true);
    this.setAttr('unit', rule.unit, true);
    field.rule.maxLength = parseInt(rule.value)
  }
  validate({ value }) {
    if (!value) value = '';
    const format = this.unit === 'byte' ? value.replace(/[^\x00-\xff]/ig, '00') : value;
    const maxLength = parseInt(this.value);
    if (format.length > maxLength) return '超出最大长度限制: ' + maxLength;
    if (format.length === maxLength && this.exProperty === 'not include') return '超出最大长度限制: ' + maxLength;
  }
}

export class MinLengthRule extends Rule {
  constructor(rule,field) {
    super(rule,field);
    this.setAttr('exProperty', rule.exProperty, true);
    this.setAttr('unit', rule.unit, true);
    field.rule.minLength = parseInt(rule.value)
  }
  validate({ value }) {
    if (!value) value = '';
    const format = this.unit === 'byte' ? value.replace(/[^\x00-\xff]/ig, '00') : value;
    const minLength = parseInt(this.value);
    if (format.length < minLength) return '不足最小长度要求: ' + minLength;
    if (format.length === minLength && this.exProperty === 'not include') return '不足最小长度要求: ' + maxLength;
  }
}