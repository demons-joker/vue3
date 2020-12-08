module.exports = {
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    proxy: {
      "/user": {
        // target: "https://zmind.sclylighting.cn/",
        target: "http://127.0.0.1:7001/",
        changeOrigin: true,
        ws: true,
        secure: false,
        pathReweite: {
          '^/user': ''
        }
      }
    }
  }
}