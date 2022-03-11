/* Home Store */
import { getBaseCategoryList } from "@/api/index";

const state = {
  baseCategoryList: [],
};
const mutations = {
  storeBaseCategoryList(state, payload) {
    state.baseCategoryList = payload;
  },
};
const actions = {
  getBaseCategoryList({ commit }) {
    getBaseCategoryList().then((res) => {
      if (res.code === 200) {
        commit("storeBaseCategoryList", res.data);
      }
    });
  },
  /* async getBaseCategoryList({ commit }) {
    const res = await getBaseCategoryList();
    commit("storeBaseCategoryList", res);
  }, */
};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
