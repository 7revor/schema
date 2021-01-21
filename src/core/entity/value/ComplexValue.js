import { Tag, TagGroup } from "../../base/Tag";
import { Value, Values } from './Value';
/**
 * 不需要定义获取value的方式，直接使用pointer指向响应的Field获取
 */
export class ComplexValueField extends Tag {
  constructor(complex) {
    super(Tag.Tags.Field);
    const { id, name, value, values, type, complexValue, complexValues } = complex;
    this.setAttr('id', id, true);
    this.setAttr('name', name, true);
    this.setAttr('type', type, true);
    let v;
    switch (type) {
      case "input":
      case 'singleCheck':
        v = new Value(value);
        break;
      case "multiCheck":
        v = new Values(values);
        break;
      case "complex":
        v = new ComplexValue(complexValue);
        break;
      case "multiComplex":
        v = new ComplexValues(complexValues);
    }
    this.setElement('value', v, () => this.$inner.element.value.value);
  }
}
/**
 * complex-value 标签
 */
export class ComplexValue extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValue, ComplexValueField, values);
  }
}
/**
 * complex-values标签
 */
export class ComplexValues extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValues, ComplexValueField, values)
  }
}
/**
 * complex-values的集合
 */
export class ComplexValuesGroup extends TagGroup {
  constructor(values) {
    super(TagGroup.Tags.ComplexValuesGroup, ComplexValues, values);
  }
}
