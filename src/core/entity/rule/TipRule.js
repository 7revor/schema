import { Rule } from "./Rule"

export class TipRule extends Rule {
  constructor(rule, field) {
    super(rule, field);
    if (rule.value === '请使用SelectProp接口查询并填充完整子属性后提交') {
      field.rule.isCascade = true;                        // 是否含有级联选项
    } else {
      field.rule.tips.push(rule.value)
    }
  }
}

export class DevTipRule extends Rule {
  constructor(rule, field) {
    super(rule, field);
    field.rule.devTips.push(rule.value)
  }
}