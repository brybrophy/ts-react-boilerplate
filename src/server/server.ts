('use strict');

import chalk from 'chalk';
console.log(chalk.bold.cyan('**********************************************************'));
console.log(chalk.bold.cyan('**************Bootstrapping The Application***************'));

// Require environment variables from .env file when not in production
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ silent: true });
}

// Get env variables. Must happen after requiring dotenv.
const apiEnv = process.env.API_ENV;
const nodeEnv = process.env.NODE_ENV;
const seoEnv = process.env.SEO_ENV;

// Fake window object if it does not exist
if (!global['window']) {
	global['window'] = {};
}

import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import renderView from './middleware/renderView';
import definePort from './middleware/definePort';
import enableLogging from './middleware/enableLogging';
import useWebpack from './middleware/useWebpack';
import RootStore from '../common/mobx/stores';

const port = definePort();

// Create Express server. Common practice is to name it 'app'
const app = express();

// Remove x-powered-by from headers
app.disable('x-powered-by');

// Enable gzip and deflate compression
app.use(compression());

// Enable logging with morgan
enableLogging(app);

if (nodeEnv === 'development') {
	useWebpack(app);
}

// CSRF protection
app.use('/api', (req, res, next) => {
	if (/json/.test(req.get('Accept'))) {
		return next();
	}

	res.sendStatus(406);
});

// Parse json from body
app.use(bodyParser.json());
// Parse cookies
app.use(cookieParser());

// Cache scripts client-side for a month.
// Webpack will hash filenames based on file contents.
// This will ensure chached assets are replaced when their content changes.
// 2592000 == seconds in a month
if (nodeEnv !== 'development') {
	app.use(
		express.static(path.resolve(__dirname, '..', '..', 'dist'), {
			setHeaders: function(res, path) {
				if (path && path.indexOf('static') !== -1) {
					res.setHeader('Cache-Control', 'public, max-age=2592000');
				}
			}
		})
	);
}

// Serve static assets and images
app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));

//robots.txt file to prevent google from indexing subdomain
const robotsText = seoEnv === 'production' ? 'Allow' : 'Disallow';
app.get('/robots.txt', (req, res, next) => {
	res.type('text/plain');
	res.send(`User-agent: *\n${robotsText}: /`);
});

// Send HTML file with bundle.js for all requests that make it this far
app.use('/*', (req, res) => {
	const rootStore = new RootStore();

	rootStore.addOne();
	rootStore.addOne();

	res.setHeader('Content-Type', 'text-plain');
	res.write(renderView(req, rootStore));
	res.end();
});

// Catch-all error handling route. Any error passed into next() will end up here.
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.sendStatus(500);
});

app.listen(port, () => {
	console.log(`Paragon Public Website Express Server Starting Up`);
	console.log(` - START TIME (LOC): ${chalk.bold.green(new Date().toString())}`);
	console.log(` - START TIME (UTC): ${chalk.bold.green(new Date().toUTCString())}`);
	console.log(` - PORT: ${chalk.bold.green(port)}`);
	console.log(` - NODE_ENV: ${chalk.bold.green(nodeEnv)}`);
	console.log(` - API_ENV: ${chalk.bold.green(apiEnv)}`);
	console.log(` - SEO_ENV: ${chalk.bold.green(seoEnv)}`);
	console.log(` - ROBOTS TEXT: ${chalk.bold.green(robotsText)}`);
	console.log(` - URL: ${chalk.bold.green('http://localhost:3000')}`);
	console.log();
	if (nodeEnv == 'development') {
		console.log(` *Using WEBPACK DEV MIDDLEWARE for STATIC BUILD ASSETS*`);
	} else {
		console.log(` *Using STATIC BUILD ASSETS*`);
	}
	console.log(chalk.bold.cyan('**********************************************************'));
	console.log(chalk.bold.cyan('**********************************************************'));

	if (nodeEnv === 'development') {
		console.log();
		console.log(chalk.bold.magenta('Webpack is bundling. This may take a minute...'));
	}
});
