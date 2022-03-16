/* Search Store */
import { getSearchListData } from "@/api";

const state = {
  searchListData: {},
};
const mutations = {
  STORESEARCHLISTDATA(state, payload) {
    state.searchListData = payload;
  },
};
const actions = {
  getSearchListData({ commit }, payload = {}) {
    getSearchListData(payload).then((res) => {
      if (res.code === 200) {
        commit("STORESEARCHLISTDATA", res.data);
      }
    });
  },
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
