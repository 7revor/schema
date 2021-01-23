import demo from "./demo.json";
import { ItemSchema } from "./entity/ItemSchema";
const catId = 121452038;
export default function () {
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