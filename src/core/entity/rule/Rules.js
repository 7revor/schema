import { TagGroup } from '../../base/Tag';
import { createRule } from './RuleFactory';
import { Rule } from './Rule';
/**
 * 字段列表
 */
export class Rules extends TagGroup {
  constructor(rules, field) {
    /**
     * 预定义field
     */
    field.define('rule', {}, false, true);
    if (field.type === 'input') field.rule.isInput = true;
    field.rule.tips = [];
    field.rule.devTips = [];
    field.rule.attribute = {};
    /**
     * 构造函数
     */
    super(TagGroup.Tags.Rules, Rule, field);
    if (Array.isArray(rules)) {
      for (let rule of rules) {
        this.push(createRule(rule, field))
      }
    }
  }
}