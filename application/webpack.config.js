var path = require("path");

var SRC_DIR = path.resolve(__dirname, "src");
var DIST_DIR = path.resolve(__dirname, "dist");

var config = {
	entry: SRC_DIR + "/app/App.jsx",
	output: {
		path: DIST_DIR + "/app/",
		filename: "bundle.js",
		publicPath: "/app/"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015", "stage-2"]
				}
			}
		]
	}
};

module.exports = config;