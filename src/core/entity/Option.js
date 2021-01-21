import { Tag, TagGroup } from "../base/Tag";
/**
 * 复选选项
 */
export class Option extends Tag {
  constructor(option) {
    super(Tag.Tags.Option);
    const { displayName, value } = option;
    if (!displayName || !value) throw new Error('Option attr displayName|value is required!');
    this.setAttr('displayName', displayName, true)
    this.setAttr('value', value, true)
  }
}

export class Options extends TagGroup {
  constructor(options) {
    super(TagGroup.Tags.Options, Option, options);
  }
}