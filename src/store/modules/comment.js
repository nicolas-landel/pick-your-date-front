import { Comment } from "@/models";

const state = {};

const getters = {};

const actions = {
  async fetchPlaceComments(_, { api, placeUuid }) {
    const response = await api.get("/place/place_comments/", {
      place: placeUuid,
    });
    Comment.insertOrUpdate({ data: response.data });
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
