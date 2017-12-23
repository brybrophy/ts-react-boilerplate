('use strict');

import chalk from 'chalk';
console.log(
    chalk.bold.cyan('************************************************')
);
console.log(
    chalk.bold.cyan('*********Bootstrapping The Application**********')
);

import * as express from 'express';
import createConfig from './config';
import dumpServerLog from './config/dumpConfig';

const server = express();
server.locals.CFG = createConfig();

const ENV = server.locals.CFG.ENV;

server.listen(ENV.PORT, () => {
    dumpServerLog({
        apiEnv: ENV.API_ENV,
        nodeEnv: ENV.NODE_ENV,
        port: ENV.PORT,
        seoEnv: ENV.SEO_ENV
    });
});

export default server;
