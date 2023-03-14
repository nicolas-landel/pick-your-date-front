import { Model } from "@vuex-orm/core";

export default class User extends Model {
  static entity = "users";

  static primaryKey = "uuid";

  static fields() {
    return {
      uuid: this.uid(""),
      firstName: this.attr(""),
      lastName: this.attr(""),
      email: this.attr(""),
      isCurrentUser: this.boolean(false),
      isAdmin: this.boolean(false),
      createdAt: this.attr(""),
    };
  }
}
