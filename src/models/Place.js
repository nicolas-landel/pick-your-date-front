import { BaseModel } from "./baseModels";

export default class Place extends BaseModel {
  static entity = "places";

  static fields() {
    return {
      ...super.fields(),
      name: this.attr(""),
      address: this.attr(""),
      addressComment: this.attr(""),
      zipcode: this.attr(""),
      cityName: this.attr(""),
      countryName: this.attr(""),
      latitude: this.attr(),
      longitude: this.attr(),
      description: this.attr(""),
      maxCapacity: this.attr(),
      createdBy: this.attr(),
      isCurrentPlace: this.attr(false),
    };
  }

  static setCurrentPlace(uuid) {
    this.update({
      where: uuid,
      data: { isCurrentPlace: true },
    });
  }

  static getCurrentPlace() {
    return this.query().where("isCurrentPlace", true).first();
  }

  static resetCurrentPlace() {
    return this.update({
      where: (place) => place.isCurrentPlace,
      data: { isCurrentPlace: false },
    });
  }
}
