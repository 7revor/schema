import { Field } from "./Field";
import { Value } from "../value/Value";
/**
 * 输入字段
 */
export class InputField extends Field {
  constructor(field, parent) {
    super(field, parent);
    /**
     * 顶级字段，直接含有value属性
     */
    if (this.isTopest()) {
      const { value } = field;
      /**
        * 设置默认值
        */
      this.setElement('value', new Value(value, this.rules));
      /**
        * 添加映射(只有顶级字段含有value信息)
        */
      this.defineElementMapping('value', () => {
        const { value } = this.getElement().value; // 默认为this.$inner.element
        return {
          value,
          display: value
        }
      })
    } else {
      /**
       * 子字段，关联顶级字段的value属性
       */
      const ancestor = this.getAncestor();


    }
  }
  /**
   * 设置新值
   */
  setValue(value) {
    const pointer = this.valuePointer;
    pointer.value = new Value({ value });
  }
}