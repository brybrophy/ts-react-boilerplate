import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import { Application } from 'express';

import configureStaticFileServer from './serveStaticFiles';
import enableLogging from './enableLogging';
import registerRobots from './registerRobots';
import renderView from './renderView';
import useWebpack from './useWebpack';

// Fake window object if it does not exist
if (!global.window) {
    global.window = {};
    global.document = {};
}

export default function registerMiddleware(server: Application) {
    server.disable('x-powered-by');
    server.use(compression());
    server.use(bodyParser.json());
    server.use(cookieParser());

    enableLogging(server);

    const env = server.locals.CFG.ENV;

    if (env.NODE_ENV === 'development') {
        useWebpack(server);
    }

    configureStaticFileServer(server);
    registerRobots(server);

    // Send HTML file with bundle.js for all requests that make it this far
    server.use('/*', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        renderView(req, res);
    });

    server.use((err, req, res, next) => {
        console.error(err.stack);
        res.sendStatus(500);
    });
}
