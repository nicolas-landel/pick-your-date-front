import { Place } from "@/models";

const state = {};

const getters = {};

const actions = {
  async fetchPlaces(_, { api }) {
    const response = await api.get("/place/");
    Place.insertOrUpdate({ data: response.data });
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
