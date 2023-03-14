import { BaseModel } from "./baseModels";

export default class Option extends BaseModel {
  static entity = "options";

  static fields() {
    return {
      ...super.fields(),
      name: this.attr(""),
      description: this.attr(""),
      color: this.attr(""),
      createdBy: this.attr(),
    };
  }
}
