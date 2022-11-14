// 接口：http://gmall-h5-api.atguigu.cn

// 当前这个模块：API接口统一管理
import { method } from "lodash";
import requests from "./ajax.js";
import mockRequests from "./mockAjax.js";

// 三级联动接口
// 请求地址：/api/product/getBaseCategoryList GET请求 无参数

// 发请求:axios发请求返回结果Promise对象
// 如果已经有baseURL加了api则不加api
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

// 获取banner（home首页轮播图接口）
export const reqBannerList = () =>
  mockRequests({ url: "/banner", method: "get" });

// 获取floor数据
export const reqFloorList = () => mockRequests.get("/floor");

// 获取搜索模块数据 地址：/api/list 方式：post 参数：使用时需要带参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
// 当前接口给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });

// 获取产品详情信息的接口 URL：/api/item/{ skuId } 请求方式：GET
export const reqGoodsInfo = (skuId) =>
  requests({ url: `/item/${skuId}`, method: "get" });

// 产品添加到购物车中，或者更新某一个产品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车列表数据接口 /api/cart/cartList GET
export const reqCartList = () =>
  requests({ url: "/cart/cartList", method: "get" });

// 删除购物车某个商品 /api/cart/deleteCart/{skuId} DELETE
export const reqDeleteCartById = (skuId) => {
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
};

// 修改商品选中状态 /api/cart/checkCart/{skuId}/{isChecked} GET
export const reqUpdateCheckedById = (skuId, isChecked) => {
  requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });
};

//获取验证码接口 /api/user/passport/sendCode/{phone} GET
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });

//注册的接口 /api/user/passport/register POST
export const reqRegister = (data) =>
  requests({ url: `/user/passport/register`, method: "post", data });

//登录的接口:请求体携带参数 phone&&password /api/user/passport/login POST
export const reqUserLogin = (data) =>
  requests({ url: `/user/passport/login`, method: "post", data });

//用户登录成功后利用token获取用户信息的接口 api/user/passport/auth/getUserInfo GET
export const reqUserInfo = () =>
  requests({ url: `/user/passport/auth/getUserInfo`, method: "get" });

//退出登录 /user/passport/logout GET
export const reqUserLogout = () =>
  requests({ url: `/user/passport/logout`, method: "get" });

//获取用户地址信息
export const reqAddressInfo = () =>
  requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: "get",
  });

//获取商品清单数据
export const reqShopInfo = () =>
  requests({ url: `/order/auth/trade`, method: "get" });

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });

// 获取订单支付信息 /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>
  requests({ url: `/payment/weixin/createNative/${orderId}`, method: "get" });

//查询支付结果
export const reqPayState = (orderId) =>
  requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" });

//获取我的订单
export const reqMyOrderList = (page, limit) =>
  requests({ url: `/order/auth/${page}/${limit}`, method: "get" });
