const Tags = {
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
  /**
   * 选项
   */
  Option: "option",
  /**
   * 标签
   */
  Label: 'label',
  /**
   * 标签集合
   */
  LabelGroup: 'label-group',
  /**
   * 复杂值
   */
  ComplexValue: 'complex-value',
}
const tags = Object.values(Tags);
/**
 * 基础schema标签
 */
export class Tag {
  constructor(tag) {
    if (!tags.includes(tag)) throw new Error(`Tag ${tag} does not exist!`);
    this.define('tag', tag);
    this.define('$inner', {
      attr: {},         // 属性
      element: {}       // 子标签
    })
  }
  /**
   * 设置属性
   */
  setAttr(key, value, mapping = false, getter = null) {
    this.$inner.attr[key] = value;
    mapping && this.defineAttrMapping(key, getter);
  }
  /**
   * 删除属性
   */
  delAttr(key) {
    delete this.$inner.attr[key];
    delete this[key];
  }
  /**
   * 设置元素
   */
  setElement(key, element, mapping = false, getter = null) {
    this.$inner.element[key] = element;
    mapping && this.defineElementMapping(key, getter);
  }
  /**
   * 删除元素
   */
  delElement(key) {
    delete this.$inner.element[key];
    delete this[key];
  }

  getAttr() {
    return this.$inner.attr;
  }

  getElement() {
    return this.$inner.element;
  }
  /**
   * 定义非枚举属性
   */
  define(key, value, configurable = false, enumerable = false) {
    Object.defineProperty(this, key, { value, configurable, enumerable });
  }
  /**
   * 定义属性映射
   */
  defineAttrMapping(key, getter = null) {
    const descriptor = { enumerable: true, configurable: true }
    if (getter) descriptor.get = () => getter(this.$inner);
    else descriptor.value = this.$inner.attr[key];
    Object.defineProperty(this, key, descriptor)
  }
  /**
   * 定义元素映射
   */
  defineElementMapping(key, getter = null) {
    const descriptor = { enumerable: true, configurable: true }
    if (getter) descriptor.get = () => getter(this.$inner);
    else descriptor.value = this.$inner.element[key];
    Object.defineProperty(this, key, descriptor)
  }
}

Tag.Tags = Tags;

const TagGroupTags = {
  /**
  * 整个schama
  */
  ItemSchema: "itemSchema",
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
  /**
   * 值集合
   */
  Values: "values",
  /**
   * 复杂值集合
   */
  ComplexValue: 'complex-value',
  /**
   * 多个复杂值集合
   */
  ComplexValues: 'complex-values',
  /**
   * 多个复杂值集合（虚拟）
   */
  ComplexValuesGroup: 'complex-values-group',
}
const tagGrouptags = Object.values(TagGroupTags);

/**
 * 基础schema标签集合
 */
export class TagGroup extends Array {
  constructor(tag, T, children, ...args) {
    super();
    if (!tagGrouptags.includes(tag)) throw new Error(`Tag ${tag} does not exist!`);
    if (!T) throw new Error("TagGroup must construct with a child type!");
    if (!(T instanceof Function)) throw new Error("Child must be typeof Class!");
    this.define('tag', tag);
    this.define('$inner', { T })
    if (Array.isArray(children)) {
      for (let child of children) {
        this.push(new T(child, ...args))
      }
    }
  }
  /**
  * 定义非枚举属性
  */
  define(key, value) {
    Object.defineProperty(this, key, { value });
  }
  /**
   * 放入子类（校验类型）
   */
  push(item) {
    if (!(item instanceof this.$inner.T)) {
      throw new Error(`${this.$inner.T.name}Group receive ${this.$inner.T.name} only.`);
    }
    super.push(item);
  }
}
TagGroup.Tags = TagGroupTags;