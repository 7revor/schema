import { Tag, TagGroup } from "../../base/Tag";
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
  constructor(option, field) {
    if (!option) option = { value: null };
    super(Tag.Tags.Value);
    Object.defineProperty(this.$inner, 'element', { value: option.value, enumerable: true });
    this.defineElementMapping('value', () => this.getElement())
  }
  /**
   * 设置新值
   */
  setValue(value) {
    Object.defineProperty(this.$inner, 'element', { value, enumerable: true });
  }
}
/**
 * 值类型集合
 */
export class Values extends TagGroup {
  constructor(values, field) {
    super(TagGroup.Tags.Values, Value, values, field);
  }
}
Value.Type = Type;