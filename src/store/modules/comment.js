import { Comment } from "@/models";
import { formatResponse } from "@/utils/helpers.js";

const state = {};

const getters = {};

const actions = {
  async fetchPlaceComments(_, { api, placeUuid }) {
    const response = await api.get("/place/place_comments/", {
      place: placeUuid,
    });
    Comment.insertOrUpdate({ data: formatResponse(response.data) });
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
