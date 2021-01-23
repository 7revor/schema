import { Rule } from "./Rule";

export class ReadOnlyRule extends Rule {
  constructor(rule, field) {
    super(rule, field);
    if (rule.value === 'true') field.rule.isReadOnly = true;
  }
}