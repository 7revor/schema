const Tags = {
  Field: "field",
  Fields: "fields",
  Rule: "rule",
  Rules: "Rules"
}
const tags = Object.values(Tags);
export default class Tag {
  constructor(tag) {
    if (!tags.includes(tag)) throw new Error(`Tag ${tag} does not exist!`)
    Object.defineProperty(this, 'tag', tag)
  }
}
Tag.Tags = Tags