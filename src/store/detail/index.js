import { getDetailData, addToCart } from "@/api";

const state = {
  detailData: {},
};
const mutations = {
  GETDETAILDATA(state, payload) {
    state.detailData = payload;
  },
  CHECKSELECTEDATTR(state, payload) {
    state.detailData.spuSaleAttrList[
      payload.outter
    ].spuSaleAttrValueList.forEach((v) => {
      v.isChecked = "0";
    });
    state.detailData.spuSaleAttrList[payload.outter].spuSaleAttrValueList[
      payload.inner
    ].isChecked = "1";
  },
};
const actions = {
  getDetailData({ commit }, payload) {
    getDetailData(payload).then((res) => {
      if (res.code == 200) commit("GETDETAILDATA", res.data);
    });
  },
  addToCart(context, { skuId, skuNum }) {
    return new Promise((resolve, reject) => {
      addToCart(skuId, skuNum).then((res) => {
        if (res.ok) resolve(res.ok);
        else reject(res.ok);
      });
    });
    /*  let res = await addToCart(skuId, skuNum);
    return res.ok; */
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
