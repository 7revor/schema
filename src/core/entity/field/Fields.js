import { TagGroup } from '../../base/Tag';
import { Field } from './Field';
import { createField } from './FieldFactory';

/**
 * Field集合
 */
export class Fields extends TagGroup {
  constructor(fields, parent = null) {
    super(TagGroup.Tags.Fields, Field);
    if (Array.isArray(fields)) {
      for (let field of fields) {
        this.push(createField(field, parent))
      }
    }
  }
}