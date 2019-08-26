const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin  = require('clean-webpack-plugin');

require('dotenv-safe').config(); //should look for .env.example and compare with .env
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
    new CleanWebpackPlugin({verbose: true}), //should 'clean' everything in output.path folder

    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
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
                      'targets': {
                        'browsers': '> 0.2%, last 2 versions, Firefox ESR',
                      },
                      'useBuiltIns': 'usage',
                      'corejs': 'core-js@2'
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
                /*
                  modlues: true allows CSS Modules specs, meaning we can 'import' our css file
                  as a module. To localize the names and avoid naming collisions, the names are hashed.
                  But we could specify how names are constructed, by using localIdentName.
                  This has the implication that localIdentName needs modeles to be true.
                  https://webpack.js.org/loaders/css-loader#modules

                  When localIdentName is not specified, its default behavior is to use a hash.
                  https://webpack.js.org/loaders/css-loader#localidentname

                  We want descriptibe names during dev.
                */
                modules: true, //Enables CSS Modules specs, should also hashes names with localIdentName.
                localIdentName:(ENV.isDev()) ? '[name]__[local]--[hash:base64:5]': undefined,

              },
            }
          ]
        },
      ]
  },

  resolve: {
    alias: {
      portfolio: path.resolve(process.env.ROOT_DIRNAME),
    }
  }
};
