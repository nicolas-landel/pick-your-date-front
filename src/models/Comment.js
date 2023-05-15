import { BaseModel } from "./baseModels";

export default class Comment extends BaseModel {
  static entity = "comments";

  static fields() {
    return {
      ...super.fields(),
      text: this.attr(""),
      answer: this.attr(),
      author: this.attr(),
      replyTo: this.attr(),
    };
  }
}
