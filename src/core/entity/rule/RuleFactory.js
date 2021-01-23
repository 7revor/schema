
import { RuleType as Type } from '../Constant';
import { Rule } from './Rule';
import { ValueTypeRule } from './ValueTypeRule';
import { MaxLengthRule, MinLengthRule } from './LengthRule'
import { MaxValueRule, MinValueRule } from './ValueRule'
import { MaxNumRule, MinNumRule } from './NumRule';
import { RequiredRule } from './RequiredRule';
import { DisableRule } from './DisableRule';
import { RegRule } from './RegRule';
import { DevTipRule, TipRule } from './TipRule';
import { ReadOnlyRule } from './ReadOnlyRule';
import { MaxSizeRule, MinSizeRule } from './SizeRule'
import { MaxImageSizeRule, MinImageSizeRule } from './ImageSizeRule'
import { ValueAttributeRule } from './ValueAttributeRule';
/**
 * 根据类型获取字段基类
 * @param {*} type 类型
 */
export const getRuleClass = (type) => {
  switch (type) {
    case Type.VALUE_TYPE_RULE: return ValueTypeRule;
    case Type.MAX_LENGTH_RULE: return MaxLengthRule;
    case Type.MIN_LENGTH_RULE: return MinLengthRule;
    case Type.MAX_VALUE_RULE: return MaxValueRule;
    case Type.MIN_VALUE_RULE: return MinValueRule;
    case Type.MAX_INPUT_NUM_RULE: return MaxNumRule;
    case Type.MIN_INPUT_NUM_RULE: return MinNumRule;
    case Type.REQUIRED_RULE: return RequiredRule;
    case Type.DISABLE_RULE: return DisableRule;
    case Type.REGEX_RULE: return RegRule;
    case Type.TIP_RULE: return TipRule;
    case Type.DEV_TIP_RULE: return DevTipRule;
    case Type.READ_ONLY_RULE: return ReadOnlyRule;
    case Type.MAX_TARGET_SIZE_RULE: return MaxSizeRule;
    case Type.MIN_TARGET_SIZE_RULE: return MinSizeRule;
    case Type.MAX_IMAGE_SIZE_RULE: return MaxImageSizeRule
    case Type.MIN_IMAGE_SIZE_RULE: return MinImageSizeRule
    case Type.VALUE_ATTRIBUTE_RULE: return ValueAttributeRule;
    default: return Rule;
  }
}
/**
 * 创建基类
 * @param {*} field 选项
 * @param {*} parent 父类
 */
export const createRule = (rule, field) => {
  const { name } = rule;
  const Clazz = getRuleClass(name);
  return new Clazz(rule, field);
}


