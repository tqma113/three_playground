const HtmlWebpackPlugin = require('html-webpack-plugin');
const entry = require('./entry');
const path = require('path');

const p = process.cwd();

module.exports = {
  mode: 'development',
  target: 'web',
  entry,
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@pages': path.resolve(p, 'src/pages'),
      '@assets': path.resolve(p, 'src/assets'),
    },
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript', '@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|gltf|glb|font|tga|bin|anim|mat|geo|model|mp4|texture|ttf|woff2)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(glsl)$/i,
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    ...Object.keys(entry).map(
      key =>
        new HtmlWebpackPlugin({
          filename: `${key}.html`,
          chunks: [key],
        })
    ),
  ],
  devServer: {
    hot: false,
    client: false,
    magicHtml: true,
  },
};
