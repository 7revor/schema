import { Tag } from "../../base/Tag";
import { isLegalType } from '../Type';
import { Rules } from '../Rule';
/**
 * 标准Field基类
 */
export class Field extends Tag {
  constructor(field, parent) {
    super(Tag.Tags.Field);
    /**
     * 初始化属性
     */
    this.initProperty(field);
    /**
     * 初始化级联关系
     */
    this.initRelation(parent)
  }

  /**
   * 初始化属性
   */
  initProperty(field) {
    const { id, name, type, rules } = field;
    /**
     * 用于描述唯一主键，以商品的标题为例，id=“title”。
     */
    if (!id) throw new Error('Field must contain id property!');
    this.setAttr('id', id, true);
    /**
     * 用于描述field的显示名，以商品的标题为例，name=“商品标题”。
     */
    this.setAttr('name', name, true);
    /**
     * 用于描述field的值的数据输入类型，schema结构对于field定义了七种类型，分别为input、multiInput、singleCheck、multiCheck、complex、multiComplex和label。详见Type
     */
    if (!isLegalType(type)) throw new Error(`Field type ${type} is not legal!`);
    this.setAttr('type', type, true);
    /**
     * 用于描述field的各类系统或者业务规则。详见Rule说明
     */
    if (rules) {
      this.setElement('rules', new Rules(rules), true);
    }
  }

  /**
   * 初始化级联关系
   * @param {*} parent 
   */
  initRelation(parent) {
    if (parent) {
      this.define('parent', parent);                // 定义父类
      this.getAncestor().child.set(this.id, this);  // 为祖先设置子类映射
    } else {
      this.define('child', new Map());              // 定义子类集合（顶级字段）
    }
  }

  /**
   * 是否为顶级field
   */
  isTopest() {
    return !this.parent
  }

  /**
   * 获取顶级field
   */
  getAncestor() {
    let parent = this;
    while (parent.parent) parent = parent.parent;
    return parent
  }
}

