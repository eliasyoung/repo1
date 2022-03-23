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
const getters = {
  getSearchGoodsList(state) {
    return state.searchListData.goodsList || [];
  },
  getSearchAttrsList(state) {
    return state.searchListData.attrsList || [];
  },
  getSearchTradeMarksList(state) {
    return state.searchListData.trademarkList || [];
  },
  getSearchPageInfo(state) {
    let { pageNo, pageSize, total, totalPages } = state.searchListData;
    return { pageNo, pageSize, total, totalPages };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
