import { Field } from "./Field";
import { Fields } from "./index";
import { ComplexValuesGroup, recursionValue } from "../value/ValueField";

/**
 * 每一个complexValues都必须包含所有field中的字段
 * multiComplex具有特殊修改方法，用于修改指定下标的数据
 */
export class MultiComplexField extends Field {
  constructor(field, parent) {
    super(field, parent);
    let { fields, complexValues } = field;
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
      recursionValue(initValue, this, complexValues)
      /**
        * 设置初始值（顶级字段映射）
        */
      this.setElement('value', new ComplexValuesGroup(initValue, this));
    }
  }
  getValue() {
    return this.getElement().value;
  }
}