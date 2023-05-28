import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __dirname = path.resolve();

const config = {
  mode: process.env.NODE_ENV,
  entry: './frontend/src/index.js',
  output: {
    path: path.resolve (__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        exclude: [/node_modules/, /^index\.css$/],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'frontend/src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './frontend/src/manifest.json', to: path.resolve('build') },
        { from: './frontend/favicon', to: './favicon' },
      ],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
};

export default config;
