import { Field } from './Field';
import { InputField } from './InputField';
import { LabelField } from './LabelField';
import { SingleCheckField } from './SingleCheckField';
import { MultiCheckField } from './MultiCheckField';
import { MultiInputField } from './MultiInput';
import { ComplexField } from './ComplexField';
import { MultiComplexField } from './MultiComplexField';
import { FieldType as Type } from '../Constant';



/**
 * 根据类型获取字段基类
 * @param {*} type 类型
 */
export const getFieldClass = (type) => {
  switch (type) {
    case Type.LABEL: return LabelField;
    case Type.INPUT: return InputField;
    case Type.MULTI_INPUT: return MultiInputField;
    case Type.SINGLE_CHECK: return SingleCheckField;
    case Type.MULTI_CHECK: return MultiCheckField;
    case Type.COMPLEX: return ComplexField;
    case Type.MULTI_COMPLEX: return MultiComplexField;
    default: return Field;
  }
}
/**
 * 创建基类
 * @param {*} field 选项
 * @param {*} parent 父类
 */
export const createField = (field, parent = null) => {
  const { type } = field;
  const Clazz = getFieldClass(type);
  return new Clazz(field, parent);
}


