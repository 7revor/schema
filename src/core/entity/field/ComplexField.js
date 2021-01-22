import { Fields } from "./index";
import { ComplexValueGroup, recursionValue } from "../value/ComplexValue";
import { Field } from "./Field";
/**
 * 复杂类型
 */
export class ComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    let { fields, complexValue, complexValues } = field;
    /**
     * 初始化子属性
     */
    this.setElement('fields', new Fields(fields, this), true);
    /**
    * 顶级字段
    */
    if (this.isTopest()) {
      /**
       * 递归设置默认值
       */
      const initValue = [];
      recursionValue(initValue, this, complexValue||complexValues);
      /**
        * 设置初始值（顶级字段映射）
        */
      this.setElement('value', new ComplexValueGroup(initValue));
    }
  }

}