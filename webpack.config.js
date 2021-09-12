const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const sharedConfig = {
	mode: 'production',
	resolve: {
		alias: {
			api: path.resolve(__dirname, 'src/api/'),
			server: path.resolve(__dirname, 'src/server/'),
			web: path.resolve(__dirname, 'src/web/'),
			components: path.resolve(__dirname, 'src/components/'),
			assets: path.resolve(__dirname, 'src/assets/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				include: path.resolve(
					__dirname,
					'node_modules',
					'@fortawesome'
				),
				use: {
					loader: 'file-loader',
					options: {},
				},
			},
			{
				test: /.(ttf|otf|eot|woff(2)|png|jpg|gif)$/,
				exclude: path.resolve(
					__dirname,
					'node_modules',
					'@fortawesome'
				),
				use: {
					loader: 'file-loader',
					options: {},
				},
			},
			{
				test: /\.svg$/,
				exclude: path.resolve(
					__dirname,
					'node_modules',
					'@fortawesome'
				),
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'react-svg-loader',
						options: {
							jsx: true, // true outputs JSX tags
						},
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

const serverConfig = {
	entry: './src/server/index.js',
	output: {
		path: path.resolve(__dirname, 'dist/server/'),
		filename: 'index.js',
	},
	devtool: 'sourcemap',
	target: 'node',
	externals: nodeExternals(),
	plugins: [
		new webpack.BannerPlugin({
			banner: `require("source-map-support").install();`,
			raw: true,
			entryOnly: false,
		}),
	],
	...sharedConfig,
};

const webConfig = {
	entry: { index: './src/web/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist/web'),
		filename: '[name].js',
		publicPath: '/',
	},
	devtool: 'sourcemap',
	target: 'web',
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/web/index.html',
			title: process.env.REACT_APP_SYSTEM_TITLE,
		}),
		new CopyPlugin([{ from: '/src/assets/**/*', to: '/dist/web/' }]),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist/web'),
		compress: true,
		port: process.env.PORT || 3000,
	},
	node: {
		fs: 'empty',
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const packageName = module.context.match(
							/[\\/]node_modules[\\/](.*?)([\\/]|$)/
						)[1];

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},
	...sharedConfig,
};

module.exports = [serverConfig, webConfig];
