//登录、注册模块的小仓库
import {
  reqGetCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqUserLogout,
} from "@/api";
let state = {
  //验证码
  code: "",
  //身份标识符很重要,本地存储并存储在vuex
  token: localStorage.getItem("TOKEN"),
  //用户名
  nickName: "",
};
let mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USERINFO(state, nickName) {
    state.nickName = nickName;
  },
  CLEAR(state) {
    //1. 清除仓库中用户信息
    state.token = "";
    state.nickName = "";
    //2. 本地存储token清空
    localStorage.removeItem("TOKEN");
  },
};
let actions = {
  //获取验证码
  async getCode({ commit, state, dispatch }, phone) {
    let result = await reqGetCode(phone);
    console.log(result);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject();
    }
  },
  //用户完成注册
  async registerUser({ commit, state, dispatch }, obj) {
    //注册接口没有返回data,不需要提交mutation
    let result = await reqRegister(obj);
    if (result.code == 200) {
      //注册成功
      return "ok";
    } else {
      //注册失败
      return Promise.reject(new Error(result.message));
    }
  },
  //用户登录:重要！！
  async userLogin({ commit, state, dispatch }, data) {
    let result = await reqUserLogin(data);
    //登录成功
    //result里会返回token以区分用户，是用户标识符
    if (result.code == 200) {
      commit("SET_TOKEN", result.data.token);
      //以后开发的时候:经常的登录的成功获取token【持久化存储】
      localStorage.setItem("TOKEN", result.data.token);
      return "ok";
    } else {
      //登录失败
      return Promise.reject(new Error(result.message));
    }
  },
  //获取用户信息
  async getUserInfo({ commit, state, dispatch }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      commit("SET_USERINFO", result.data.nickName);
      return "ok";
    } else {
      return Promise.reject();
    }
  },
  //退出登录的业务
  async logout({ commit, state, dispatch }) {
    //发请求通知服务器销毁当前token
    let result = await reqUserLogout();
    if (result.code == 200) {
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
let getters = {};

//对外暴露
export default {
  state,
  mutations,
  actions,
  getters,
};
