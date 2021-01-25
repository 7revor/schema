import demo from "./demo.json";
import { ItemSchema } from "./entity/ItemSchema";
// const catId = 121452038;  // 材质属性
// const catId = 50003881;  // 度量衡
//  const catId = 122012002; // 单位选择单位度量衡
// const catId = 50012419;    // 自定义销售属性
 const catId = 50012322;     // 子属性模板
export default function () {
  const schema = new ItemSchema(demo);
  console.log(schema)
  return 
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost/item/publish/schema/get?catId=' + catId, true);
  xhr.responseType = 'json';
  xhr.onload = function (e) {
    console.log(xhr.response)
    if (xhr.response.success) {
      console.log(xhr.response.data)
      const schema = new ItemSchema(xhr.response.data);
      console.log(schema)
    } else {
      console.error(xhr.response.errorMessage)
    }
  }
  xhr.send();
}