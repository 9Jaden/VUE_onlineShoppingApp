// home模块的小仓库

import { reqCategoryList, reqBannerList, reqFloorList} from "@/api";

// state:仓库存储数据的地方
const state = {
  // state中数据默认初始值别瞎写，分清服务器返回对象还是返回数组
  category: [],
  bannerList: [],
  floorList: [],
};
// mutations:修改state的唯一手段
const mutations = {
  GETCATEGORY(state, category) {
    category.pop();
    state.category = category;
  },
  GETBANNER(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOOR(state,floorList) {
    state.floorList = floorList;
  }
};
// actions: 处理action的地方，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  //这里可以书写业务逻辑，但是不能修改state
  // 通过api里的接口函数调用，向服务器发请求，获取服务器的数据
  // async和await
  async getCategory({ commit }) {
    let result = await reqCategoryList();
    // console.log(result); //返回了promise
    if (result.code == 200) {
      commit("GETCATEGORY", result.data);
    }
  },

  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqBannerList();
    if (result.code == 200) {
      commit("GETBANNER", result.data);
    }
  },

  // 获取floor数据
  async getFloorList({ commit}) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOOR", result.data);
    }
  }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
