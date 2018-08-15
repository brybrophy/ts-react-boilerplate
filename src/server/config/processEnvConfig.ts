'use strict';

import chalk from 'chalk';

function checkSetEnv(envKey: string, fallback: string) {
    if (!process.env[envKey]) {
        process.env[envKey] = fallback;

        const line1 = `*process.env.${envKey} is`;
        const line2 = `${chalk.bold.yellow('NOT')} set.`;
        const line3 = `SETTING process.env.${envKey} to`;
        const line4 = `${chalk.bold.yellow(fallback)}*`;

        console.log(line1, line2, line3, line4);
    }

    return process.env[envKey];
}

function setEnvDefaults() {
    checkSetEnv('API_ENV', 'production');
    checkSetEnv('SEO_ENV', 'staging');
    checkSetEnv('NODE_ENV', 'production');
    console.log();
}

export function getProcessEnvConfig() {
    require('dotenv').config({ silent: true });
    setEnvDefaults();

    return {
        API_ENV: process.env.API_ENV,
        NODE_ENV: process.env.NODE_ENV,
        SEO_ENV: process.env.SEO_ENV,
        PORT: process.env.PORT || 3000
    };
}
