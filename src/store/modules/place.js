import { Place } from "@/models";
import { formatResponse } from "@/utils/helpers.js";

const state = {};

const getters = {};

const actions = {
  async fetchPlaces(_, { api }) {
    const response = await api.get("/place/");
    Place.insertOrUpdate({ data: formatResponse(response.data) });
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
