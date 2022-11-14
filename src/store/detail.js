import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
//封装游客身份模块uuid，生成随机字符串
import { getUUID } from "@/utils/uuid_token.js";
const state = {
  goodInfo: {},
  // 游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  // 获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(result);
    // 加入购物车以后发请求，前台将参数带给服务器，但并没有返回其他数据，只返回code==200，所以不用三连环
    // 不需要存储数据
    // 当前async函数如果执行，返回promise
    if (result.code == 200) {
      // 代表服务器加入购物车成功
      return "fulfilled";
    } else {
      // 代表服务器加入购物车失败
      return Promise.reject(new Error("failed"));
    }
  },
};
const getters = {
  // 简化数据
  categoryView(state) {
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
