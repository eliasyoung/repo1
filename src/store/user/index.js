import {
  reqGetRegisterCode,
  reqRegisterUser,
  reqLogin,
  reqGetUserInfoByToken,
  reqLogout,
} from "@/api";

const state = {
  token: localStorage.getItem("token"),
  userInfo: {},
};
const mutations = {
  STORETOKEN(state, payload) {
    state.token = payload;
  },
  STOREUSERINFO(state, payload) {
    state.userInfo = payload;
  },
};
const actions = {
  async getRegisterCode(context, phone) {
    let res = await reqGetRegisterCode(phone);
    if (res.code == 200) return res.data;
    else return Promise.reject(res.message);
  },

  async registerUser(context, data) {
    let res = await reqRegisterUser(data);
    console.log(res);
    if (res.code == 200) return "ok";
    else return Promise.reject(res.message);
  },

  async loginUser({ commit }, data) {
    let res = await reqLogin(data);
    if (res.code == 200) {
      commit("STORETOKEN", res.data.token);
      localStorage.setItem("token", res.data.token);
      return "ok";
    } else alert(res.message);
  },

  async getUserInfoByToken({ commit }) {
    let res = await reqGetUserInfoByToken();
    commit("STOREUSERINFO", res.data);
  },

  async logoutUser({ commit }) {
    let res = await reqLogout();
    if (res.code == 200) {
      localStorage.removeItem("token");
      commit("STOREUSERINFO", {});
      commit("STORETOKEN", "");
      return "ok";
    }
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
