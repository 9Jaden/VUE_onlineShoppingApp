import Vue from "vue";
import Vuex from "vuex";
// 需要使用vuex
Vue.use(Vuex);
// 引入小仓库
import home from "./home";
import search from "./search";
import detail from "./detail.js";
import shopCart from "./shopCart.js";
import user from "./user.js";
import trade from "./trade.js";

// 对外暴露store类的一个实例
// 别忘了去入口文件main.js注册该vuex仓库
export default new Vuex.Store({
  //利用modules实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade,
  },
});
