import { BaseModel } from "./baseModels";
import { stringDateToTimestamp } from "@/utils/date.js";

export default class Answer extends BaseModel {
  static entity = "answers";

  static fields() {
    return {
      ...super.fields(),
      date: this.attr(),
      option: this.attr(),
      place: this.attr(),
      isArchived: this.boolean(false),
      createdBy: this.attr(),
    };
  }

  static getAnswersBetween(start, end) {
    start = stringDateToTimestamp(start.toLocaleString());
    end = stringDateToTimestamp(end.toLocaleString());
    return this.query()
      .where(
        (a) =>
          stringDateToTimestamp(a.date) >= start &&
          stringDateToTimestamp(a.date) <= end
      )
      .get();
  }
}
