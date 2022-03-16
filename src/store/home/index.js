/* Home Store */
import {
  getBaseCategoryList,
  getMockBannerData,
  getMockFloorData,
} from "@/api/index";

const state = {
  baseCategoryList: [],
  bannerData: [],
  floorData: [],
};
const mutations = {
  STOREBASECATEGORYLIST(state, payload) {
    state.baseCategoryList = payload;
  },
  STOREBANNERDATA(state, payload) {
    state.bannerData = payload;
  },
  STOREFLOORDATA(state, payload) {
    state.floorData = payload;
  },
};
const actions = {
  getBaseCategoryList({ commit }) {
    getBaseCategoryList().then((res) => {
      if (res.code === 200) {
        commit("STOREBASECATEGORYLIST", res.data);
      }
    });
  },
  getBannerData({ commit }) {
    // mock data for now
    getMockBannerData().then((res) => {
      if (res.code === 200) {
        commit("STOREBANNERDATA", res.data);
      }
    });
  },
  getFloorData({ commit }) {
    getMockFloorData().then((res) => {
      if (res.code === 200) {
        commit("STOREFLOORDATA", res.data);
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
