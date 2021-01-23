import { Field, ValueFieldList } from "./Field";
import { Fields } from "./Fields";
import { ComplexValues, ComplexValuesGroup, recursionValue, ValueField } from "../value/ValueField";

class Template {
  constructor(field) {
    this.id = field.id;
    this.name = field.name;
    this.type = field.type;
  }
  setTemplate(template) {
    this.template = template;
  }
  getTemplate() {
    return this.template;
  }
}

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
    if (this.isRoot()) {
      /**
       * 解析默认值
       */
      const initValue = [];
      if (complexValues) recursionValue(initValue, this, complexValues)
      /**
        * 设置初始值（顶级字段映射）
        */
      this.setElement('value', new ComplexValuesGroup(initValue, this));
    }
    /**
     * 添加映射(只有顶级字段含有value信息)
     */
    this.defineElementMapping('value', () => {
      const valueField = this.getValueField();
      if (!valueField) return [];
      if (valueField instanceof ValueFieldList) {           // 含有嵌套complex-values
        return [...valueField.map(field => ({ id: field.id, name: field.name, value: field.toJSON() }))];  // 需要填充field信息方便识别
      } else {
        const valueList = [];
        for (let complexValueGroup of valueField.value) {
          const value = [];
          for (let complexValue of complexValueGroup) {
            value.push({ id: complexValue.id, name: complexValue.name, value: complexValue.toJSON() })
          }
          valueList.push(value);
        }
        return valueList
      }
    })
    if (this.isRoot()) {
      const template = this.getComplexValuesTemplate();
      console.log(template);
      this.addComplexValues(template);
      this.removeComplexValues(0)
    }
  }
  /**
    * 获取属性填充模板
    */
  getComplexValuesTemplate() {
    const initValue = [];
    recursionValue(initValue, this);
    const template = new Template(this);
    template.setTemplate(initValue);
    return template
  }
  /**
   * 应用属性填充模板
   * @param {*} template 模板数据
   * @param  {...any} indexArray 想要填充到的complexValues下标（从第一个complexValues元素开始）
   */
  addComplexValues(template, ...indexArray) {
    if (!(template instanceof Template)) throw new Error('addcomplexValues receive Template from getComplexValuesTemplate only!');
    if (this.id !== template.id) throw new Error('Template id mismatch!');
    const values = template.getTemplate();
    const valueField = this.getValueField();    //  两种情况：1.根节点，返回element  2.valueField数组
    if (valueField instanceof ValueFieldList) { // 子节点
      throw new Error('Child add not support!')
    } else {                                    // 根节点
      values.forEach(value => {
        const complexValues = new ComplexValues(value, this);
        valueField.value.push(complexValues)
      })
    }
  }
  /**
   * 删除某组属性
   */
  removeComplexValues(index, ...indexArray) {
    /**
       * 递归
       */
    const iterator = (value) => {
      if (value instanceof Array) {
        value.forEach(iterator);
      } else {
        if (value instanceof ValueField) {
          iterator(value.value);
          value.field.removeValueField(value);
        }
      }
    }
    const valueField = this.getValueField();    //  两种情况：1.根节点，返回element  2.valueField数组
    if (valueField instanceof ValueFieldList) { // 子节点
      throw new Error('Child remove not support!')
    } else {                                    // 根节点
      const targetValueField = valueField.value[index];
      if (!targetValueField) throw new Error('TargetValueField not found！')
      iterator(targetValueField);
      valueField.value.splice(index, 1)
    }
  }
}