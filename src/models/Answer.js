import { BaseModel } from "./baseModels";

export default class Answer extends BaseModel {
  static entity = "answers";

  static fields() {
    return {
      ...super.fields(),
      date: this.attr(),
      option: this.attr(),
      place: this.attr(),
      isArchived: this.attr(),
      createdBy: this.attr(),
    };
  }
}
