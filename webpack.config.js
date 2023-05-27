import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'

const __dirname = path.resolve()

const config = {
  mode: process.env.NODE_ENV,
  entry: './frontend/src/index.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './frontend/src/index.html'
    }),
    new CopyPlugin({
            patterns: [
        { from: "./frontend/src/manifest.json", to: "./manifest.json" },
        { from: "./frontend/favicon", to: "./favicon" },
            ],
        }),
  ],
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
      }
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx', '.css'],
  }
};

export default config