import { Place } from "@/models";

const state = {};

const getters = {};

const actions = {
  async fetchPlaces(_, { api }) {
    const response = await api.get("/place/");
    Place.insertOrUpdate({ data: response.data });
    console.log("EEEE", Place.all());
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
