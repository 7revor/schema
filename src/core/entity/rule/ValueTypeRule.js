import { Rule } from "./Rule";
import { ValueType } from '../Constant';
export class ValueTypeRule extends Rule {
  validate(v) {
    const { value } = v;
    if (value) {
      switch (this.value) {
        case ValueType.TEXTAREA:
        case ValueType.HTML:
        case ValueType.TEXT: return;
        case ValueType.INTEGER:
        case ValueType.LONG:
          if (!/^\d+$/.test(value)) return '输入值必须为整数类型';
          break;
        case ValueType.DECIMAL:
          if (!/^\d+(\.\d+)?$/.test(value)) return '输入值必须为浮点类型';
          break;
        case ValueType.DATE:
          if (!(value instanceof Date)) return '输入值必须为日期类型';
          break;
        case ValueType.TIME:
          if (!/^1\d{12}$/.test(value)) return '输入值必须为时间戳类型';
          break;
        case ValueType.URL:
          if (!/^https?:\/\/.*$/.test(value)) return '输入值必须为URL类型';
          break;
      }
    }
  }
}