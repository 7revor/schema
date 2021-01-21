import { Tag } from "../base/Tag";
/**
 * label主要用于描述说明信息
 */
export class Label extends Tag {
  constructor(option) {
    super(Tag.Tags.Label);
    const { desc, name, value } = option;
    /**
     * 描述
     */
    this.setAttr('desc', desc, true);
    /**
     * 名称
     */
    this.setAttr('name', name, true);
    /**
     * 值
     */
    this.setAttr('value', value, true);
  }
}

export class LabelGroup extends Tag {
  constructor(labels) {
    super(Tag.Tags.LabelGroup);
    const { label, name, labelGroup } = labels;
    /**
     * 名称
     */
    this.setAttr('name', name, true);
    if (label) {
      this.setElement('label', new Label(label), true);
    }
    if (Array.isArray(labelGroup)) {
      this.setElement('labelGroup', labelGroup.map(item => new LabelGroup(item)), false);
    }
  }
}