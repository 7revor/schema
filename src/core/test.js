import demo from "./demo.json";
import { ItemSchema } from "./entity/ItemSchema";
export default function () {
  demo;
  console.log(demo);
  const schema = new ItemSchema(demo);
  console.log(schema)
}