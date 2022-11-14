// search模块的小仓库

import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: {},
};

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

const actions = {
  // 获取search模块数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSearchInfo()这个函数在调用获取服务器数据时候，至少传递一个参数（空对象）
    // params形参是当用户派发action时候第二个参数传递过来的，至少是空对象
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};

// 计算属性
// 项目中getters主要作用是：简化仓库中数据
const getters = {
  // 当前形参state是当前仓库中的state，并非大仓库中的state
  goodsList(state) {
    // 如果没网还没获取到数据则返回空数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
