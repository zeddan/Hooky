var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: SRC_DIR + "/app/App.jsx",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            },{
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
                include: SRC_DIR
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ // define where to save the file
            filename: 'main.css',
            allChunks: true,
        }),
    ],
};

module.exports = config;
