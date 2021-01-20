import { Tag, TagGroup } from "../base/Tag";
import { Rule } from "./Rule";
import { isLegalType } from './Type'

export class Field extends Tag {
  constructor(field) {
    super(Tag.Tags.Field);
    const { id, name, type, rules, values, value, complexValues, complexValue, options, labelGroup, dependGroup, operator, dependExpress, fields } = field;
    /**
     * 用于描述唯一主键，以商品的标题为例，id=“title”。
     */
    if (!id) throw new Error('Field must contain id property!');
    this.id = id;
    /**
     * 用于描述field的显示名，以商品的标题为例，name=“商品标题”。
     */
    this.name = name;
    /**
     * 用于描述field的值的数据输入类型，schema结构对于field定义了七种类型，分别为input、multiInput、singleCheck、multiCheck、complex、multiComplex和label。详见Type
     */
    if (!isLegalType(type)) throw new Error(`Field type ${type} is not legal!`);
    this.type = type;
    /**
     * 用于描述field的各类系统或者业务规则。详见Rule说明
     */
    this.rules = [];
    if (rules) {
      for (let rule of rules) {
        this.rules.push(new Rule(rule))
      }
    }
  }
}
/**
 * 字段列表
 */
export class FieldList extends TagGroup {
  constructor(fields) {
    super(TagGroup.Tags.Fields);
    if (!fields || !Array.isArray(fields)) throw new Error('Schema fieldList must be typeof array!');
    for (let field of fields) {
      this.push(new Field(field))
    }
  }
  push(field) {
    if (!(field instanceof Field)) throw new Error("Field list receive Field only.");
    super.push(field);
  }
}