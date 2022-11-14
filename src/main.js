import Vue from "vue";
import App from "./App.vue";
// 三级联动组件，注册为全局组件
import NavIndex from "@/components/TypeNav/NavIndex.vue";
import CarouselIndex from "@/components/Carousel/Carousel.vue";
import PageIndex from "@/components/Pagination/PageIndex.vue";
import { Button, MessageBox } from "element-ui";
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(NavIndex.name, NavIndex);
Vue.component(CarouselIndex.name, CarouselIndex);
Vue.component(PageIndex.name, PageIndex);
Vue.component(Button.name, Button);

// ElementUI注册组件时第二种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 入口文件引入并注册路由
import router from "@/router";

Vue.config.productionTip = false;

// 引入仓库
import store from "@/store";

// 测试发请求
// import { reqCategoryList } from "@/api";
// reqCategoryList();

// 引入MockServer.js---mock数据
import "@/mock/mockServe.js";

// 引入swiper的样式，这样任何组件都可以用
import "swiper/css/swiper.css";

// 引入图片懒加载插件
// import VueLazyload from "vue-lazyload";
// import emptycat from "@/assets/emptycat.jpg";
// Vue.use(VueLazyload, {
//   // 懒加载默认图片
//   loading: emptycat,
// });

// 统一引入接口文件夹里所有请求函数
import * as API from "@/api";
import VueRouter from "vue-router";

// 引入表单验证插件
import "@/plugins/validate";

new Vue({
  render: (h) => h(App),
  // 布局全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由，kv一致省略v，且小写
  router,
  // 注册仓库，组件实例的身上会多了一个属性--$store属性
  store,
}).$mount("#app");
