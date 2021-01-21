import { Field } from './Field';
import { InputField } from './InputField';
import { TagGroup } from '../../base/Tag';
import { LabelField } from './LabelField';
import { SingleCheckField } from './SingleCheckField';
import { MultiCheckField } from './MultiCheckField';
import { MultiInputField } from './MultiInput';
import { ComplexField } from './ComplexField';
import { MultiComplexField } from './MultiComplexField';

export const getFieldClass = (type) => {
  switch (type) {
    case 'label': return LabelField;
    case 'input': return InputField;
    case 'multiInput': return MultiInputField;
    case 'singleCheck': return SingleCheckField;
    case 'multiCheck': return MultiCheckField;
    case 'complex': return ComplexField;
    case 'multiComplex': return MultiComplexField;
    default: return Field;
  }
}

export const createField = (field) => {
  const { type } = field;
  const Clazz = getFieldClass(type);
  return new Clazz(field);
}


/**
 * Field集合
 */
export class Fields extends TagGroup {
  constructor(fields) {
    super(TagGroup.Tags.Fields, Field);
    if (Array.isArray(fields)) {
      fields.forEach(field => this.push(createField(field)))
    }
  }
}