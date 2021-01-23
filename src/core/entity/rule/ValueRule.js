import { Rule } from "./Rule";

export class MaxValueRule extends Rule {
  constructor(rule, field) {
    super(rule);
    const num = parseInt(rule.value);
    if (!isNaN(num)) {
      field.rule.maxValue = num;
    }
  }
}

export class MinValueRule extends Rule {
  constructor(rule, field) {
    super(rule);
  }
}