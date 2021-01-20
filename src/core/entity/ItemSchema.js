import { Tag } from "../base/Tag";
import { Field, FieldList } from "./Field";
export class ItemSchema extends Tag {
  constructor(option) {
    super(Tag.Tags.Schema);
    const { fieldList } = option;
    this.fieldList = new FieldList(fieldList);
  }
}