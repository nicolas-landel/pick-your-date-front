const state = () => ({
  notification: null,
});

const getters = {
  getNotification: (state) => state.notification,
};

const actions = {
  showSuccessNotification({ commit }, message, timeout = 4000) {
    commit("setNotification", {
      timeout,
      // position: "center",
      type: "success",
      text: message,
    });
  },
  showErrorNotification({ commit }, message, timeout = 4000) {
    commit("setNotification", {
      timeout,
      // position: "center",
      type: "error",
      text: message,
    });
  },
  showWarningNotification({ commit }, message, timeout = 4000) {
    commit("setNotification", {
      timeout,
      // position: "center",
      type: "warning",
      text: message,
    });
  },
};

const mutations = {
  setNotification(state, notification) {
    state.notification = notification;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
