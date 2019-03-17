const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // publicPath: process.env.NODE_ENV === `production` ? `./` : `/`,
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    port: 9999,
    compress: true,
    host: `192.168.1.103`,
    open: true,
    headers: {}
    // proxy: {
    //   '/v2': {
    //     target: 'http://192.168.1.239:7211',
    //     changeOrigin: true,
    //     secure:false,
    //     pathRewrite: {
    //       '^/v2': '/v2'
    //     }
    //   }
    // }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  warnings: false,
                  drop_console: true, //console
                  drop_debugger: false
                  // pure_funcs: ['console.log'] //移除console
                }
              }
            })
          ]
        },
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
          })
        ]
      }
    }
  }
}