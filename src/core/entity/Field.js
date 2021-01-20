import Tag from "../base/Tag";
import { Rules } from "./Rule";
import { isLegalType } from './Type'

export class Field extends Tag {
  constructor(field) {
    super(Tag.Field);
    const { id, name, type, rules, values, complexValues, option, defaultValue, labelGroup, dependGroup, operator, dependExpress } = field;
    /**
     * 用于描述唯一主键，以商品的标题为例，id=“title”。
     */
    if (!id) throw new Error('Field must contain id property!');
    this.id = id;
    /**
     * 用于描述field的显示名，以商品的标题为例，name=“商品标题”。
     */
    if (!name) throw new Error('Field must contain name property!');
    this.name = name;
    /**
     * 用于描述field的值的数据输入类型，schema结构对于field定义了七种类型，分别为input、multiInput、singleCheck、multiCheck、complex、multiComplex和label。详见Type
     */
    if (!isLegalType(type)) throw new Error('Field type is not legal!');
    this.type = type;
    if (rules) this.rules = new Rules(rules);
  }
}