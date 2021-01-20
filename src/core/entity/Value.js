import { Tag } from "../base/Tag";
/**
 * value类型
 */
const Type = {
  /**
   * 文本型
   */
  TEXT: "text",
  /**
   * 小数型
   */
  DECIMAL: "decimal",
  /**
   * 整数型
   */
  INTEGER: "integer",
  /**
   * 长整数型
   */
  LONG: "long",
  /**
   * 日期型
   */
  DATE: "date",
  /**
   * 时间型
   */
  TIME: "time",
  /**
   * 超链接
   */
  URL: "url",
  /**
   * 多行文本
   */
  TEXTAREA: "textarea",
  /**
   * 支持html标记语法的文本
   */
  HTML: "html"
}
/**
 * 值类型
 */
export class Value extends Tag {
  constructor(option) {
    super(Tag.Tags.Value);
    const { inputValue, img, value } = option;
    this.inputValue = inputValue;
    this.img = img;
    this.value = value;
  }
}
Value.Type = Type;