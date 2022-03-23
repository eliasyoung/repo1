import { getDetailData } from "@/api";

const state = {
  detailData: {},
};
const mutations = {
  GETDETAILDATA(state, payload) {
    state.detailData = payload;
  },
};
const actions = {
  getDetailData({ commit }, payload) {
    getDetailData(payload).then((res) => {
      commit("GETDETAILDATA", res.data);
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
