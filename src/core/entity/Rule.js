import { Tag } from "../base/Tag";

/**
 * 所有规则类型
 */
const Type = {
  /**
   * 用于描述field值需要满足数据类型，包括了text（文本型）/decimal（小数型）/integer（整数型）/date（日期型）/long（长整数型）/url（超链接）/textarea（多行文本）/html（支持html标记语法的文本）
   */
  VALUE_TYPE_RULE: "valueTypeRule",
  /**
   * 最大长度
   */
  MAX_LENGTH_RULE: "maxLengthRule",
  /**
   * 最小长度
   */
  MIN_LENGTH_RULE: "minLengthRule",
  /**
   * 最大值（数值类型时有效）
   */
  MAX_VALUE_RULE: "maxValueRule",
  /**
   * 最小值（数值类型时有效）
   */
  MIN_VALUE_RULE: "minValueRule",
  /**
   * 最多可选数（多选时有效）
   */
  MAX_INPUT_NUM_RULE: "maxInputNumRule",
  /**
   * 至少要选数（多选时有效）
   */
  MIN_INPUT_NUM_RULE: "minInputNumRule",
  /**
   * 是否必填，默认为false，true/false
   */
  REQUIRED_RULE: "requiredRule",
  /**
   * 是否忽略此field，为true时，将不对rule进行check，同时他的value也将无效。默认为false，值范围包含true/false
   */
  DISABLE_RULE: "disableRule",
  /**
   * 正则表达式匹配
   */
  REGEX_RULE: "regexRule",
  /**
   * Field中展示的tip信息，用于一些无法直接用语法描述或者过于复杂的规则，或者提示信息,需要给用户透出。
   */
  TIP_RULE: "tipRule",
  /**
   * 	一般用于给开发者提示，不需要展示给用户，开发者可以通过此Rule获取特定的信息，如 例子中的如何获取售后模板信息
   */
  DEV_TIP_RULE: "devTipRule",
  /**
   * 只读，用户无法修改返回值，值范围为true/false
   */
  READ_ONLY_RULE: "readOnlyRule",
  /**
   * 最大目标文件大小
   */
  MAX_TARGET_SIZE_RULE: "maxTargetSizeRule",
  /**
   * 最小目标文件大小
   */
  MIN_TARGET_SIZE_RULE: "minTargetSizeRule",
  /**
   * 最大图片大小，指的是分辨率，如800*800
   */
  MAX_IMAGE_SIZE_RULE: "maxImageSizeRule",
  /**
   * 最小图片大小
   */
  MIN_IMAGE_SIZE_RULE: "minImageSizeRule",
  SET_RULE: "setRule",
  MAX_DECIMAL_DIGITS_RULE: "maxDecimalDigitsRule",
  MIN_DECIMAL_DIGITS_RULE: "minDecimalDigitsRule",
}
const types = Object.values(Type);
/**
 * 规则
 */
export class Rule extends Tag {
  constructor(option) {
    super(Tag.Tags.Rule);
    const { name, value } = option;
    if (!name || !value) throw new Error('Rule must contain name and value property!')
    if (!types.includes(name)) throw new Error(`Rule ${name} does not exist!`);
    Object.assign(this, option);
  }
}
Rule.Type = Type;
