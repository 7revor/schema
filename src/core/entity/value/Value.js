import { Tag, TagGroup } from "../../base/Tag";
/**
 * 值类型
 */
export class Value extends Tag {
  constructor(option, field) {
    if (!field) throw new Error('Value must construct with Field!')
    if (!option) option = { value: null };
    super(Tag.Tags.Value);
    Object.defineProperty(this.$inner, 'element', { value: option.value, enumerable: true });
    this.defineElementMapping('value', () => this.getElement());
    if (field.rule) {
      this.define('attributes', Object.keys(field.rule.attribute));
      this.attributes.forEach(key => {
        this.setAttr(key, option[key], true, () => this.getAttr()[key]);
      })
    }
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