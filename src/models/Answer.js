import { BaseModel } from "./baseModels";
import { addDaysToDate } from "@/utils/date.js";

export default class Answer extends BaseModel {
  static entity = "answers";

  static fields() {
    return {
      ...super.fields(),
      startDate: this.attr(),
      duration: this.attr(),
      option: this.attr(),
      place: this.attr(),
      isArchived: this.boolean(false),
      createdBy: this.attr(),
    };
  }

  get endDate() {
    console.log(this.startDate, addDaysToDate(this.startDate, this.duration));
    return addDaysToDate(this.startDate, this.duration).toLocaleString();
  }
}
