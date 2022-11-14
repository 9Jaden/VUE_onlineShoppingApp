// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./route.js";
import store from "@/store";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 使用插件
Vue.use(VueRouter);

// 配置路由
let router = new VueRouter({
  // 别写错单词了是routes不是routs也不是router
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 使得路由跳转时滚动条跳到最上方
    return { y: 0 };
  },
});

// 全局守卫：前置守卫（在路由跳转前）
router.beforeEach(async (to, from, next) => {
  // to：可以获取所跳转到路由的信息
  // from：可以获取从哪个路由来的信息
  // next：放行函数 next()放行 next(path)放行至指定路由 next(false)不放
  // next();
  // 以下是防止已经登录的用户又进入登录页面
  let token = store.state.user.token;
  // let name = store.state.user.userInfo.name;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      if (name) {
        next();
      } else {
        // 获取用户信息在首页展示
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // token失效 需要清楚token
          store.dispatch("logout");
          next("/login");
        }
      }
    }
  } else {
    // 未登录 无法去交易、支付相关页面
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1 ||
      toPath.indexOf("/shopcart") != -1
    ) {
      // 用redirect使得登录后进入本来想要去的页面
      next("/login?redirect=" + toPath);
    }
    next();
  }
});

export default router;
