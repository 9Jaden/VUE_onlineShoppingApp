// 引入mockjs模块
import Mock from "mockjs";
// 引入JSON数据格式
// 注意这些JSON文件没有对外暴露却可以引入
// 这是因为webpack默认对外暴露：图片、JSON数据格式
import banner from "./banner.json";
import floor from "./floors.json";

// mock数据
// 第一个参数：请求地址；第二个参数：请求数据
// code:200代表成功
// 不需要加.json
Mock.mock("/mock/banner", { code: 200, data: banner }); // 模拟首页轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor });
// 还未使用，在main.js引入后使用
