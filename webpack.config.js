const path = require('path');
const HTMLWepackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './frontend/src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWepackPlugin({
            template: './frontend/src/index.html'  // not sure about this guy
        })
    ],
}


//build folder goes in to chrome extension