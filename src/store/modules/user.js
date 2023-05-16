import { User } from "@/models";
import { TokenService } from "@/setup/tokenService";
import api from "@/setup/api";
import { formatResponse } from "@/utils/helpers.js";

const state = {
  token: null,
};

const getters = {
  getCurrentUser: () => User.query().where("isCurrentUser", true).first(),
};

const actions = {
  async refreshCurrentUser({ getters }) {
    // Used when local storage has data but no user in vuex-orm -> insert user
    if (!TokenService.getUserUuid() || !TokenService.getToken()) {
      return;
    }
    const currentUser = getters.getCurrentUser;
    if (!currentUser || currentUser.uuid !== TokenService.getUserUuid()) {
      const response = await api.get(`/user/${TokenService.getUserUuid()}/`);
      const { user } = formatResponse(response.data);
      await User.insertOrUpdate({
        data: { ...user, isCurrentUser: true },
      });
    }
  },
  async fetchUsersMembers(_, { api, placeUuid }) {
    const response = await api.get(`/user/members/`, {
      place: placeUuid,
    });
    const users = formatResponse(response.data);
    await User.insertOrUpdate({
      data: users.map((user) => ({ ...user })),
    });
  },
  async logoutUser() {
    // TODO delete app data
    User.deleteAll();
    TokenService.removeAllKeys();
  },
};

const mutations = {
  SET_USER_TOKEN: (state, token) => (state.token = token),
  SET_USER_EMAIL: (state, email) => (state.email = email),
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
