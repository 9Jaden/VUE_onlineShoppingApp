import { reqCartList } from "@/api";
import { reqDeleteCartById } from "@/api";
import { reqUpdateCheckedById } from "@/api";

const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //获取购物车列表
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },
  // 删除购物车某个产品
  async deleteCartById({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    // console.log(result);
    // if (result.code == 200) {
    //   return "success";
    // } else {
    //   return Promise.reject(new Error("failed"));
    // }
  },
  //修改购物车某个产品选中状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    console.log(result);
  },
  // 删除已选中产品
  deleteChecked({ dispatch, getters }) {
    // 通过上下文context来调用删除某个产品的actions以及获得数据
    // context就可以理解为小仓库
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartById", item.skuId) : "";
      // 将每一次返回的promise添加到数组中
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
  // 全选or not
  allCheckedOrNot({ dispatch, state }, check) {
    let PromiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked: check,
      });
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
