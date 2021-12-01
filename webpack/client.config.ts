import 'dotenv/config';
import path from 'path';
import dotenv, { DotenvParseOutput } from 'dotenv';
import webpack, { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { IS_DEV } from './env';

const env = dotenv.config().parsed as DotenvParseOutput;

type EnvKeys = {
  [key: string]: string;
};

const envKeys = Object
  .keys(env)
  .reduce((accObj, next) => {
    accObj[`process.env.${next}`] = JSON.stringify(env[next]);
    return accObj;
  }, {} as EnvKeys);

export default {
  mode: IS_DEV ? 'development' : 'production',
  name: 'client',
  entry: {
    bundle: [
      IS_DEV && 'react-hot-loader/patch',
      IS_DEV && 'webpack-hot-middleware/client?path=/__webpack_hmr',
      './src/client/index.tsx',
    ].filter(Boolean),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/index.css',
    }),
    IS_DEV && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
} as Configuration;
