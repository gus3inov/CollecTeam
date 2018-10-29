const path = require('path');
const paths = require('./paths');
const fs = require('fs');
const webpack = require('webpack');

const nodeModules = {};

fs.readdirSync('node_modules')
	.filter((x) => ['.bin'].indexOf(x) === -1)
	.forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
	entry: paths.appServer,
	target: 'node',
	output: {
		path: paths.appServerBuild,
		filename: 'index.js',
	},
	externals: nodeModules,
	plugins: [
		new webpack.BannerPlugin({
				banner: 'require("source-map-support").install();',
				raw: true,
				entryOnly: false,
			}),
		new webpack.IgnorePlugin(/\.(css|less)$/)
	],
	devtool: 'sourcemap'
};
