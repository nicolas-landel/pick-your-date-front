import { Option } from "@/models";
import { formatResponse } from "@/utils/helpers.js";

const state = {};

const getters = {};

const actions = {
  async fetchPlaceOptions(_, { api, placeUuid }) {
    const response = await api.get("/place/place_options/", {
      place: placeUuid,
    });
    Option.insertOrUpdate({ data: formatResponse(response.data) });
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
