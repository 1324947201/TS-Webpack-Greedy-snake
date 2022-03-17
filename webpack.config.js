const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定当前处于开发模式
  mode: 'production',
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: 'bundle.js',
    // 每次编译都清空dist文件夹
    clean: true,
    //配置打包环境
    environment: {
      arrowFunction: false, //不使用箭头函数
      const: false           //不使用const   
    }
  },
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      //ts文件的处理规则
      {
        test: /\.ts$/, // test指定的是规则生效的文件
        exclude: /node_modules/, // 要排除的文件
        use: [
          { //配置babel
            loader: 'babel-loader', //指定loader
            options: {//设置babel
              presets: [  //设置运行环境
                [
                  '@babel/preset-env', //指定环境的插件
                  {   //配置信息
                    modules: 'commonjs',
                    targets: {    //要兼容的目标浏览器
                      'chrome': '60',
                      'ie': '10'
                    },
                    'corejs': '3',// 指定corejs的版本 package.json中的版本为3.21.1
                    'useBuiltIns': 'usage' // 使用corejs的方式，'usage' 表示按需加载
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
      },
      //less文件的处理规则
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env', { browers: 'last 2 versions' }]
                ]
              }
            }
          },
          'less-loader'
        ]
      },
      //js文件处理规则
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     { //配置babel
      //       loader: 'babel-loader', //指定loader
      //       options: {//设置babel
      //         presets: [  //设置运行环境
      //           [
      //             '@babel/preset-env', //指定环境的插件
      //             {   //配置信息
      //               targets: {    //要兼容的目标浏览器
      //                 'chrome': '60',
      //                 'ie': '10'
      //               },
      //               'corejs': '3',// 指定corejs的版本 package.json中的版本为3.21.1
      //               'useBuiltIns': 'usage' // 使用corejs的方式，'usage' 表示按需加载
      //             }
      //           ]
      //         ]
      //       }
      //     },
      //   ]
      // },
    ],
  },
  // 配置Webpack插件
  plugins: [
    //配置html插件
    new HTMLWebpackPlugin({
      template: './src/index.html' //html模板
    }),
  ],
  // 用来指定哪些文件可以作为模块
  resolve: {
    extensions: ['.ts', '.js']
  }
}