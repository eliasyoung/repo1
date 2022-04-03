import { getCartList, deleteCartItem, reqToggleItemChecked } from "@/api";

const state = {
  cartList: [{}],
};
const mutations = {
  GETCARTLIST(state, payload) {
    state.cartList = payload;
  },
  UPDATEISCHECKED(state, payload) {
    if (payload == -1) {
      state.cartList[0].cartInfoList.forEach((v) => (v.isChecked = 0));
    } else if (payload == -2) {
      state.cartList[0].cartInfoList.forEach((v) => (v.isChecked = 1));
    } else {
      let obj = state.cartList[0].cartInfoList.find((v) => v.skuId == payload);
      if (obj.isChecked == 1) obj.isChecked = 0;
      else obj.isChecked = 1;
    }
  },
};
const actions = {
  getCartList({ commit }) {
    getCartList().then((res) => {
      if (res.code == 200) commit("GETCARTLIST", res.data);
    });
  },
  deleteCartItem(context, skuId) {
    return new Promise((resolve, reject) => {
      deleteCartItem(skuId).then((res) => {
        if (res.code == "200") resolve("ok");
        else reject("fault");
      });
    });
  },
  async toggleItemChecked(context, { skuId, isChecked }) {
    let res = await reqToggleItemChecked(skuId, isChecked);
    if (res.code == "200") return "ok";
    else return Promise.reject("fault");
  },
};
const getters = {
  getCartInfoList(state) {
    if (!state.cartList[0]) return [];
    else return state.cartList[0].cartInfoList || [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
