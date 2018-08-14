import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import forceDomain from 'forcedomain';
import morgan from 'morgan';
import path from 'path';
import express, { Application, Response, Request, NextFunction } from 'express';

import registerRobots from './registerRobots';
import staticRedirects from '../redirects/staticRedirects';
import sitemap from './sitemap';
import checkRouteExists from './checkRouteExists';

export default function registerMiddleware(app: Application) {
    app.disable('x-powered-by');
    app.set('case sensitive routing', true);
    app.set('strict routing', true);
    app.use(compression());
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
        require('prerender-node')
            .set('prerenderToken', process.env.PRERENDER_TOKEN)
            .set('protocol', 'https')
    );

    if (app.get('env') === 'development') {
        app.use(morgan('dev'));
    } else {
        app.use(morgan('short'));
    }

    app.use(
        forceDomain({
            hostname: 'www.highseas.com',
            protocol: 'https',
            excludeRule: /[a-zA-Z0-9][a-zA-Z0-9-]+\.herokuapp\.com/i
        })
    );

    for (const route of staticRedirects) {
        app.use(route.from, (_req: Request, res: Response) => {
            res.redirect(301, route.to);
        });
    }

    app.use('/robots.txt', registerRobots);
    app.use('/sitemap.xml', sitemap);
    app.use('/dist', express.static(`${__dirname}/../client`));
    app.use('/*', checkRouteExists, (_req: Request, res: Response) => {
        res.sendFile(
            path.resolve(__dirname, '..', '..', 'dist', 'client', 'index.html')
        );
    });
    app.use((_req: Request, res: Response) => {
        res.sendStatus(404);
    });
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
        if (err.response && err.response.status) {
            const { title, detail } = err.response.data;
            const message = `${title}: ${detail}`;

            return res.status(err.response.status).send({
                status: err.response.status,
                message
            });
        }

        console.error(err.stack);
        res.sendStatus(500);
    });
}
