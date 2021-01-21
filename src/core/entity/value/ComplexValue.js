import { Tag, TagGroup } from "../../base/Tag";
import { Value, Values } from './Value';
export class ComplexValue extends Tag {
  constructor(complex) {
    super(Tag.Tags.Field);
    const { id, name, value, values, type } = complex;
    this.setAttr('id', id, true);
    this.setAttr('name', name, true);
    this.setAttr('type', type, true);
    this.setElement('value', new Value(value), true);
    this.setElement('values', new Values(values), true);
  }
}
export class ComplexValueGroup extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValue, ComplexValue, values);
  }
}
