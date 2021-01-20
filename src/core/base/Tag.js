const Tags = {
  /**
   * 整个schama
   */
  Schema: "itemSchema",
  /**
   * 主字段
   */
  Field: "field",
  /**
   * 规则
   */
  Rule: "rule",
  /**
   * 值
   */
  Value: "value",
}
const tags = Object.values(Tags);
/**
 * 基础schema标签
 */
export class Tag {
  constructor(tag) {
    if (!tags.includes(tag)) throw new Error(`Tag ${tag} does not exist!`)
    Object.defineProperty(this, 'tag', { value: tag })
  }
}
Tag.Tags = Tags;

const TagGroupTags = {
  /**
   * 主字段集合
   */
  Fields: "fields",
  /**
   * 选项集合
   */
  Options: "options",
  /**
   * 规则集合
   */
  Rules: "rules",
}
const tagGrouptags = Object.values(TagGroupTags);

/**
 * 基础schema标签集合
 */
export class TagGroup extends Array {
  constructor(tag) {
    super();
    if (!tagGrouptags.includes(tag)) throw new Error(`Tag ${tag} does not exist!`)
    Object.defineProperty(this, 'tag', { value: tag })
  }
}
TagGroup.Tags = TagGroupTags;