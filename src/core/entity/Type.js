export const Type = {
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
const types = Object.values(Type);
/**
 * 判断是否为合法类型
 */
export const isLegalType = (type) => types.includes(type);