const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode:'development',//开发环境
  entry:'./src/index.js',//入口js
  output:{
    filename:'bundle.js',//打包后文件名
    path:path.resolve(__dirname,'dist'),//打包后输出目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',//模板html
      filename:'index.html',//打包后文件名     
    }),
    new MiniCssExtractPlugin({
      filename:'index.css',//生成的css，默认main.css
    })
  ],
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      },
      {
        test:/\.scss$/,
        use:[
          MiniCssExtractPlugin.loader,
          {loader:'css-loader'},
          {loader:'sass-loader'}//loader从右向左执行
        ]
      }  
    ]
  }

}