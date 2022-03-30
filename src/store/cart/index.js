import { getCartList } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, payload) {
    state.cartList = payload;
  },
};
const actions = {
  getCartList({ commit }) {
    getCartList().then((res) => {
      if (res.code == 200) commit("GETCARTLIST", res.data);
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
