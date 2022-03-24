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
      if (res.code == 200) commit("GETDETAILDATA", res.data);
    });
  },
};
const getters = {
  categoryView(state) {
    return state.detailData.categoryView || {};
  },
  skuInfo(state) {
    return state.detailData.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.detailData.spuSaleAttrList || [];
  },
  valuesSkuJson(state) {
    return state.detailData.valuesSkuJson || "";
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
