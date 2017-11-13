import * as webpack from 'webpack';
import * as express from 'express';
import * as path from 'path';
const config = require('../../../webpack.config');
const compiler = webpack(config);

export default function(app) {
	app.use(
		require('webpack-dev-middleware')(compiler, {
			noInfo: true,
			publicPath: config.output.publicPath,
			stats: {
				assets: false,
				colors: true,
				version: false,
				hash: false,
				timings: false,
				chunks: false,
				chunkModules: false
			}
		})
	);
	app.use(require('webpack-hot-middleware')(compiler));
	app.use(express.static(path.resolve(__dirname, '../../../src')));
}
