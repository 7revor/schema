import { Field } from "./Field";
import { LabelGroup } from '../Label';
export class LabelField extends Field {
  constructor(field, parent) {
    super(field, parent);
    /**
     * 描述信息
     */
    if (field.labelGroup) {
      this.setElement('labelGroup', new LabelGroup(field.labelGroup), true);
    }
  }
}