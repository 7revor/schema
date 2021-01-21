import { Field } from "./Field";
import { LabelGroup } from '../Label';
export class LabelField extends Field {
  constructor(field, parent) {
    super(field, parent);
    const { labelGroup } = field;
    /**
     * 描述信息
     */
    if (labelGroup) {
      this.setElement('labelGroup', new LabelGroup(labelGroup));
    }
  }
}