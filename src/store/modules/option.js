import { Option } from "@/models";

const state = {};

const getters = {};

const actions = {
  async fetchPlaceOptions(_, { api, placeUuid }) {
    const response = await api.get("/place/place_options/", {
      place: placeUuid,
    });
    Option.insertOrUpdate({ data: response.data });
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
