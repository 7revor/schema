import { Tag } from "../../base/Tag";
/**
 * 规则
 */
export class Rule extends Tag {
  constructor(option) {
    super(Tag.Tags.Rule);
    const { name, value } = option;
    this.setAttr('name', name)
    this.defineAttrMapping('name', false);
    this.setAttr('value', value)
    this.defineAttrMapping('value', false);
  }
  /**
   * 校验方法
   */
  validate() {
    throw new Error('Base Rule Class could not do validate!');
  }
}


