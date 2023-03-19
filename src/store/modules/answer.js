import { Answer } from "@/models";

const state = {};

const getters = {};

const actions = {
  async fetchPlaceAnswers(_, { api, placeUuid }) {
    const response = await api.get("/place/place_answers/", {
      place: placeUuid,
    });
    Answer.insertOrUpdate({ data: response.data });
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
