import { Rule } from "./Rule";

export class RequiredRule extends Rule {
  validate(v) {
    const { value } = v;
    if (!value && this.value === 'true') return '缺少必填项'
  }
}