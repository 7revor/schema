import { Rule } from "./Rule";

export class ValueAttributeRule extends Rule {
  constructor(rule, field) {
    super(rule, field);
    if (rule.value === 'inputValue') field.rule.isInput = true;
    field.rule.attribute[rule.value] = null;
  }
}