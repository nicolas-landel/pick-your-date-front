import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";

// Import vuex-orm models
import { Place, User, Answer, Comment, Option } from "@/models";

// Import store modules
import PlaceModule from "./modules/place";
import NotificationModule from "./modules/notification";
import UserModule from "./modules/user";

const database = new VuexORM.Database();

// Register vuex-orm models
database.register(Place);
database.register(User);
database.register(Comment);
database.register(Answer);
database.register(Option);

const store = new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  plugins: [VuexORM.install(database)],
  modules: {
    place: PlaceModule,
    notification: NotificationModule,
    user: UserModule,
  },
});

export default store;
