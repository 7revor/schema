import { Rule } from "./Rule";

export class RequiredRule extends Rule {
  constructor(rule, field) {
    super(rule, field);
    if (rule.value === 'true') field.rule.isRequired = true;
  }
  
  validate(v) {
    const { value } = v;
    if (!value && this.value === 'true') return '缺少必填项'
  }
}