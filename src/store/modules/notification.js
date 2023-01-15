const state = () => ({
  notification: null,
});

const getters = {
  getNotification: (state) => state.notification,
};

const actions = {
  showSuccessNotification({ commit }, message, timeout = 3000) {
    commit("setNotification", {
      timeout,
      message,
      type: "success",
    });
  },
  showErrorNotification({ commit }, message, timeout = 3000) {
    commit("setNotification", {
      timeout,
      message,
      type: "error",
    });
  },
  showWarningNotification({ commit }, message, timeout = 3000) {
    commit("setNotification", {
      timeout,
      message,
      type: "warning",
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
