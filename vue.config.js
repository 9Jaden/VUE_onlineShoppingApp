const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 代理服务器实现跨域
  devServer: {
    proxy: {
      "/api": {
        // 要去获取数据的ip地址
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { "^/api": "" },
      },
    },
    // host: "0.0.0.0",
    // port: 3000,
    // client: {
    //   WebSocketURL: "ws://192.168.1.4:3000/ws",
    // },
    // headers: { "Access-Control-Allow-Origin": "*" },
  },
});
