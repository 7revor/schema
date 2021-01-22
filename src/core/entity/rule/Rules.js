import { TagGroup } from '../../base/Tag';
import { createRule } from './RuleFactory';
import { Rule } from './Rule';
/**
 * 字段列表
 */
export class Rules extends TagGroup {
  constructor(rules) {
    super(TagGroup.Tags.Rules, Rule);
    if (Array.isArray(rules)) {
      for (let rule of rules) {
        this.push(createRule(rule))
      }
    }
  }
}