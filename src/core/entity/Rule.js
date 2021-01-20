import Tag from "../base/Tag";

/**
 * 所有规则类型
 */
const TYPES = {
  MAX_LENGTH_RULE: "maxLengthRule",
  MIN_LENGTH_RULE: "minLengthRule",
  MAX_VALUE_RULE: "maxValueRule",
  MIN_VALUE_RULE: "minValueRule",
  MAX_INPUT_NUM_RULE: "maxInputNumRule",
  MIN_INPUT_NUM_RULE: "minInputNumRule",
  VALUE_TYPE_RULE: "valueTypeRule",
  REQUIRED_RULE: "requiredRule",
  DISABLE_RULE: "disableRule",
  MAX_DECIMAL_DIGITS_RULE: "maxDecimalDigitsRule",
  MIN_DECIMAL_DIGITS_RULE: "minDecimalDigitsRule",
  REGEX_RULE: "regexRule",
  SET_RULE: "setRule",
  TIP_RULE: "tipRule",
  DEV_TIP_RULE: "devTipRule",
  READ_ONLY_RULE: "readOnlyRule",
  MAX_TARGET_SIZE_RULE: "maxTargetSizeRule",
  MIN_TARGET_SIZE_RULE: "minTargetSizeRule",
  MAX_IMAGE_SIZE_RULE: "maxImageSizeRule",
  MIN_IMAGE_SIZE_RULE: "minImageSizeRule",
}
const types = Object.values(TYPES);
/**
 * 规则
 */
export class Rule extends Tag {
  constructor(option) {
    super(Tag.Rule);
    const { name, value } = option;
    if (!name || !value) throw new Error('Rule must contain name and value property!')
    if (!types.includes(name)) throw new Error(`Rule ${name} does not exist!`);
    Object.assign(this, option);
  }
}
/**
 * 规则集合
 */
export class Rules extends Tag {
  constructor(option) {
    super(Tag.Rules);
    if (!option || !option.rules) throw new Error('Rules must contain list of rules!');
    this.rules = [];
    for (let rule of option.rules) {
      this.rules.push(new Rule(rule))
    }
  }
}
