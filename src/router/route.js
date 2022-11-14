// 引入路由组件
import HomeIndex from "@/pages/Home/HomeIndex.vue";
import SearchIndex from "@/pages/Search/SearchIndex.vue";
import RegisterIndex from "@/pages/Register/RegisterIndex.vue";
import LoginIndex from "@/pages/Login/LoginIndex.vue";
import DetailIndex from "@/pages/Detail/DetailIndex.vue";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess.vue";
import ShopCart from "@/pages/ShopCart/ShopCart.vue";
import TradeIndex from "@/pages/Trade/TradeIndex.vue";
import PayIndex from "@/pages/Pay/PayIndex.vue";
import PaySuccess from "@/pages/PaySuccess/PaySuccess.vue";
import CenterIndex from "@/pages/Center/CenterIndex.vue";
// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder/MyOrder.vue";
import GroupOrder from "@/pages/Center/groupOrder/GroupOrder.vue";

export default [
  {
    path: "/center",
    component: CenterIndex,
    meta: { show: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "center",
        redirect: "center/myorder",
      },
    ],
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: { show: true },
    
  },
  {
    path: "/pay",
    component: PayIndex,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/trade",
    component: TradeIndex,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/home",
    component: HomeIndex,
    // 使用路由元信息控制组件显示与否，这里show则显示footer
    meta: { show: true },
  },
  {
    path: "/search/:keyword?",
    component: SearchIndex,
    meta: { show: true },
    name: "search",
    // 路由组件能不能传递props数据
    // 1. 布尔值写法：只能传params
    // props: true,
    // 2. 对象写法：额外给路由组件传递一些参数
    // props: {a:1, b:2}
    // 3. 函数写法：可以把params和query参数通过props传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k };
    },
  },
  {
    path: "/register",
    component: RegisterIndex,
    meta: { show: false },
  },
  {
    path: "/login",
    component: LoginIndex,
    meta: { show: false },
  },
  // 重定向：在项目跑起来的时候，访问/，立马定向至首页
  {
    path: "*",
    redirect: "./home",
  },
  {
    path: "/detail/:skuId",
    component: DetailIndex,
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: { show: true },
  },
  {
    path: "/shopcart",
    name: "shopcart",
    component: ShopCart,
    meta: { show: true },
  },
];
