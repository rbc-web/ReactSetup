const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv-safe').config(); //should compare .env.example with .env
const ENV = require('../constants/environment.js');

let env = null;

if(ENV.isDev()){
  env = 'development';
}
else if(ENV.isProd()){
  env = 'production';
}
else {
  env = 'none'
}

module.exports = {
  mode: env,
  devtool: (ENV.isDev())? 'eval-source-map': false,
  context: path.resolve(process.env.ROOT_DIRNAME, 'components'),
  entry: {
      nameOfYourApp: ['./App.js']
  },

  output: {
    filename: 'javascript/[name].bundle.js',
    path: path.resolve(process.env.ROOT_DIRNAME, 'build')
  },

  plugins:[
    new CleanWebpackPlugin({verbose: true}), //should 'clean' output.path folder

    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(process.env.ROOT_DIRNAME, 'index.html'),
    }),

  ],

  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ['@babel/preset-env', {
                      'targets': '> 0.2%, last 1 version, not dead, Firefox ESR',
                      'useBuiltIns': 'usage',
                      'corejs': 3
                    }
                  ],
                  ['@babel/preset-react'],
                ],
              },
            },

          ],
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            //should prepare css to be extracted.
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName:(ENV.isDev()) ? '[name]__[local]--[hash:base64:5]': '[hash:base64]'
                }
              },
            }
          ]
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ]
  },

  resolve: {
    alias: {
      nameOfYourApp: path.resolve(process.env.ROOT_DIRNAME),
    }
  }
};
