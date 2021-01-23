import { Rule } from "./Rule";

export class MaxNumRule extends Rule{
  constructor(rule, field) {
    super(rule, field);
     field.rule.maxNum = parseInt(rule.value);
  }
}

export class MinNumRule extends Rule{
  constructor(rule, field) {
    super(rule, field);
    field.rule.minNum = parseInt(rule.value);
  }
}