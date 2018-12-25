('use strict');

import chalk from 'chalk';
console.log(
    chalk.bold.cyan('************************************************')
);
console.log(
    chalk.bold.cyan('*********Bootstrapping The Application**********')
);

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import express, { Application, Response, Request, NextFunction } from 'express';

import registerRobots from './middleware/registerRobots';
import staticRedirects from './redirects/staticRedirects';
import sitemap from './middleware/sitemap';
import checkRouteExists from './middleware/checkRouteExists';
import { getProcessEnvConfig } from './config/processEnvConfig';
import printServerLog from './config/printConfig';

const app: Application = express();
const envConfig = getProcessEnvConfig();
app.locals.envConfig = envConfig;

app.disable('x-powered-by');
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('short'));
}

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

app.listen(envConfig.PORT, () => {
    printServerLog({
        apiEnv: envConfig.API_ENV,
        nodeEnv: envConfig.NODE_ENV,
        port: envConfig.PORT,
        seoEnv: envConfig.SEO_ENV
    });
});

export default app;
