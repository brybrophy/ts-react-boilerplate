('use strict');

import chalk from 'chalk';
console.log(
    chalk.bold.cyan('************************************************')
);
console.log(
    chalk.bold.cyan('*********Bootstrapping The Application**********')
);

import express from 'express';
import createConfig from './config';
import dumpServerLog from './config/dumpConfig';
import registerMiddleware from './middleware';

const app = express();
app.locals.CFG = createConfig();

registerMiddleware(app);

const ENV = app.locals.CFG.ENV;

app.listen(ENV.PORT, () => {
    dumpServerLog({
        apiEnv: ENV.API_ENV,
        nodeEnv: ENV.NODE_ENV,
        port: ENV.PORT,
        seoEnv: ENV.SEO_ENV
    });
});

export default app;
