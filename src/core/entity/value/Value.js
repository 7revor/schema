import { Tag, TagGroup } from "../../base/Tag";
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