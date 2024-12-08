const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },      
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          'style-loader',
          'css-loader', // Standard CSS without modules
        ],
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new Dotenv(),
    //new MiniCssExtractPlugin({
//      filename: '[name].css',
    //}),
    new ModuleFederationPlugin({
      name: 'company',
      filename: 'remoteEntry.js',
      exposes: {
        './CompanyComponent': './src/components/Companies',        
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1', strictVersion: true },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1', strictVersion: true },
      },
    }),
  ],
}; 