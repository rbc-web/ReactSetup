const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin  = require('clean-webpack-plugin');

require('dotenv-safe').config(); //should look for .env.example and compare with .env

const Dotenv = require('dotenv-webpack'); //provide env variables in front-end.

let env = null;

switch(process.env.ENV){
  case process.env.DEV:
    env = 'development';
    break;
  case process.env.PROD:
    env = 'production';
    break;
  default:
    env = 'none'
}

module.exports = {
  mode: env,
  devtool: (env===process.env.DEV)? 'eval-source-map': false,
  context: path.resolve(process.env.ROOT_DIRNAME, 'components'),
  entry: {
      portfolio: ['./App.js']
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

    new Dotenv({
      path: path.resolve(process.env.ROOT_DIRNAME, '.env'),
      safe: path.resolve(process.env.ROOT_DIRNAME, '.env.example'), //.env.example contains env var without values. To be commited.
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
                  /*
                    should be able to take options, as second element in array.
                    order matters when applying, presets. I believe the last one is applied first.
                    The targets specified should be the default, but included to have visual.
                    Had to provide corejs option, if doesn't complain about not sepcifying the verison.
                    But made some assumptions, and those are that teh core-js package comes as a dependency
                    of another package.
                    So babel-polyfill is a dependecny since we are using useBuilt Options
                    https://babeljs.io/docs/en/babel-polyfill
                    https://babeljs.io/docs/en/babel-preset-env#usebuiltins

                  */
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
                localIdentName:(env===process.env.DEV) ? '[name]__[local]--[hash:base64:5]': undefined,
                
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