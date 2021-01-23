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
    if (this.name === '宝贝销售规格') {
      const template = this.getComplexValuesTemplate()
      this.addComplexValues(template);
      const template1 = this.getComplexValuesTemplate()
      this.addComplexValues(template1);
      this.removeComplexValues(1)
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
      const caizhi = this.fields[0];
      const template = caizhi.getComplexValuesTemplate();
      console.log(template);
      caizhi.addComplexValues(template, 0);
      caizhi.removeComplexValues(0, 0)
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
   */
  addComplexValues(template, ...indexArray) {
    if (!(template instanceof Template)) throw new Error('addcomplexValues receive Template from getComplexValuesTemplate only!');
    const values = template.getTemplate();
    if (!indexArray.length) {      // 根部添加
      if (!this.isRoot()) throw new Error('Child field should addComplexValues with indexArray!');  // 根部节点校验
      if (this.id !== template.id) throw new Error('Template id mismatch!');
      values.forEach(value => {
        const complexValues = new ComplexValues(value, this);
        const valueFieldGroup = this.getElement().value;
        valueFieldGroup.push(complexValues)
      })
    } else {                  // 子元素添加
      let targetValueFieldGroup = this.getAncestor().getElement().value;
      for (let index of indexArray) {
        targetValueFieldGroup = targetValueFieldGroup[index];   // 目标complexValues
      }
      const targetValueField = targetValueFieldGroup.find(valueField => valueField.id === template.id);  // 目标valueField
      if (!targetValueField) throw new Error('Index valueField not found!');
      values.forEach(value => {
        const complexValues = new ComplexValues(value, this);                 // 所有子节点递归关联
        targetValueField.value.push(complexValues);                           // 父字段无需关联（通过子节点(已关联)获取）
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
    if (!indexArray.length) {      // 根部移除
      if (!this.isRoot()) throw new Error('Child field should removeComplexValues with indexArray!');  // 根部节点校验
      const valueFieldGroup = this.getElement().value;
      const targetValueField = valueFieldGroup[index];
      if (!targetValueField) throw new Error('TargetValueField not found！')
      iterator(targetValueField);
      valueFieldGroup.splice(index, 1)
    } else {                      // 子节点移除
      let targetValueFieldGroup = this.getAncestor().getElement().value;
      for (let i of indexArray) {
        targetValueFieldGroup = targetValueFieldGroup[i];
      }
      const $targetValueField = targetValueFieldGroup.find(valueField => valueField.id === this.id);   // 目标valueField
      if (!$targetValueField) throw new Error('IndexArray valueField not found!');
      if (!$targetValueField.value[index]) throw new Error('Index valueField not found!');
      iterator($targetValueField.value[index]);     // 递归清除子节点
      $targetValueField.value.splice(index, 1)      // 父节点无需清除（通过子节点(已关联)获取）
    }
  }
}