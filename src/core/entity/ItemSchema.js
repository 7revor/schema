import { TagGroup } from "../base/Tag";
import { Field } from "./field/Field";
import { createField } from './field/FieldFactory'
/**
 * 商品Schema信息
 */
export class ItemSchema extends TagGroup {
  constructor(options) {
    super(TagGroup.Tags.ItemSchema, Field);
    console.time('init')
    if (Array.isArray(options.fieldList)) {
      options.fieldList.forEach(field => this.push(createField(field, null)))
    }
    console.timeEnd('init')
  }
}