const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

module.exports = env => {
	const { ifProduction, ifDevelopment } = getIfUtils(env);

	return {
		// ------------------------------------
		// Entry Points
		// ------------------------------------
		entry: ifProduction('./index.js', [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			path.resolve(__dirname, 'src/client')
		]),

		// ------------------------------------
		// Output
		// ------------------------------------
		output: ifProduction(
			{
				path: path.resolve(__dirname, 'dist'),
				filename: 'static/js/bundle.[hash:8].js',
				publicPath: '/'
			},
			{
				path: path.resolve(__dirname, 'src'),
				filename: 'bundle.js',
				publicPath: '/'
			}
		),

		// ------------------------------------
		// Plugins
		// ------------------------------------
		plugins: removeEmpty([
			new ProgressBarPlugin({
				format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
				clear: false
			}),
			new CaseSensitivePathsPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: ifProduction(JSON.stringify('production'), JSON.stringify('development'))
				}
			}),
			new ExtractTextPlugin('assets/styles.css'),
			new webpack.LoaderOptionsPlugin({
				test: /\.scss$/,
				debug: true,
				options: {
					postcss: function() {
						return [precss, autoprefixer];
					},
					context: path.join(__dirname, 'src'),
					output: { path: path.join(__dirname, 'dist') }
				}
			}),
			new CopyWebpackPlugin([{ from: './public' }]),
			new AssetsWebpackPlugin({ path: path.join(__dirname, 'src/server/config') }),
			ifDevelopment(new webpack.NamedModulesPlugin()),
			ifDevelopment(new webpack.HotModuleReplacementPlugin()),
			ifProduction(
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						screw_ie8: true,
						warnings: false
					},
					sourceMap: true
				})
			)
		]),

		// ------------------------------------
		// Devtool
		// ------------------------------------
		devtool: ifProd('source-map', 'cheap-eval-source-map'),

		// ------------------------------------
		// Resolve
		// ------------------------------------
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json']
		},

		// ------------------------------------
		// Module
		// ------------------------------------
		module: {
			rules: [
				{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
				{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
				{
					test: /\.json$/,
					loader: 'json-loader'
				},
				{
					test: /\.scss|css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'postcss-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
					})
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/i,
					use: [
						'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
						{
							loader: 'image-webpack-loader',
							options: {
								progressive: true,
								optimizationLevel: 7,
								interlaced: false,
								pngquant: {
									quality: '65-90',
									speed: 4
								}
							}
						}
					]
				},
				{
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'url-loader?limit=10000&mimetype=application/font-woff'
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'file-loader'
				}
			]
		},

		// ------------------------------------
		// Node
		// ------------------------------------
		node: {
			console: true,
			fs: 'empty',
			net: 'empty',
			tls: 'empty'
		},

		// ------------------------------------
		// Externals
		// ------------------------------------
		externals: {
			react: 'React',
			'react-dom': 'ReactDOM'
		}
	};
};