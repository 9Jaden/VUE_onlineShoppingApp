// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start：进度条开始（捕获到请求时）；done：进度条结束（拿到数据后）
// 引入进度条样式
import "nprogress/nprogress.css";
// 在当前模块中引入store
import store from "@/store";

// 1.利用axios对象方法create，去创建一个axios实例
// 2.request其实就是axios，只不过可以稍微配置一下
let requests = axios.create({
  // 配置对象
  // 因为接口中路径都带有/api，如此基础路径，发请求时路径当中会出现api
  baseURL: "/api",
  // 代表请求超时的事件
  timeout: 5000,
});

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    // 请求头添加一个字段
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 需要携带token给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  // 进度条开始动
  nprogress.start();
  // config:配置对象，对象里header请求头属性很重要
  return config;
});

// 响应拦截器
requests.interceptors.response.use(
  // 成功的回调函数:服务器响应数据回来以后，响应拦截器可以检测到，做一些事情
  (res) => {
    nprogress.done();
    return res.data;
  },
  // 响应失败的回调函数
  (err) => {
    alert(err.message);
    return new Promise();
  }
);

// 对外暴露
export default requests;
