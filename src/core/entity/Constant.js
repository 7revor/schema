export const FieldType = {
  /**
   * schema开头的信息
   */
  LABEL: "label",
  /**
   * 当前field的值为文本输入
   */
  INPUT: "input",
  /**
   * 当前field的值为多行文本输入型
   */
  MULTI_INPUT: "multiInput",
  /**
   * 当前field的值为单选输入型，类似于radio
   */
  SINGLE_CHECK: "singleCheck",
  /**
   * 当前field的值为多选输入型，类似于checkbox
   */
  MULTI_CHECK: "multiCheck",
  /**
   * 当前field的值为复合结构，表示数据的聚合
   */
  COMPLEX: "complex",
  /**
   * 当前field的值为复合结构，与complex有差别的在于multiComplex的field是可以有多份数据实例样本
   */
  MULTI_COMPLEX: "multiComplex"
}
const fieldTypes = Object.values(FieldType);
/**
 * 判断是否为合法类型
 */
export const isLegalFieldType = (type) => fieldTypes.includes(type);

/**
 * 所有规则类型
 */
export const RuleType = {
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
  /**
   * 属性值RULE
   */
  VALUE_ATTRIBUTE_RULE: "valueAttributeRule"
}
const ruleTypes = Object.values(RuleType);

export const isLegalRuleType = (type) => ruleTypes.includes(type);
