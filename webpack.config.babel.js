import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const jsOutputPath = 'js/app.js';
const cssOutputPath = 'css/app.min.css';

const ExtractSASS = new ExtractTextPlugin(cssOutputPath);

export default {
  entry: [
    './src/js/app.js',
    './src/sass/app.scss',
  ],
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: jsOutputPath,
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  watch: true,
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
                'transform-runtime',
                'transform-object-rest-spread'
            ],
          },
        },
      },
      {
        test: /\.(sass|scss)$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/sass'),
        ],
        use: ExtractSASS.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true,
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        }),
      },{
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/sass'),
        ],
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin(path.resolve(__dirname, `public/${cssOutputPath}`), {
        allChunks: true,
    }),
    ExtractSASS,
  ],
};