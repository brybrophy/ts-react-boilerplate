import chalk from 'chalk';

export interface IServerLogProps {
    apiEnv: string;
    nodeEnv: string;
    port: string;
    seoEnv: string;
}

export default function dumpServerLog({
    apiEnv,
    nodeEnv,
    port,
    seoEnv
}: IServerLogProps) {
    console.log(`Express Server Starting Up`);
    console.log(
        ` - START TIME (LOC): ${chalk.bold.green(new Date().toString())}`
    );
    console.log(
        ` - START TIME (UTC): ${chalk.bold.green(new Date().toUTCString())}`
    );
    console.log(` - PORT: ${chalk.bold.green(port)}`);
    console.log(` - NODE_ENV: ${chalk.bold.green(nodeEnv)}`);
    console.log(` - API_ENV: ${chalk.bold.green(apiEnv)}`);
    console.log(` - SEO_ENV: ${chalk.bold.green(seoEnv)}`);
    console.log();
    if (nodeEnv == 'development') {
        console.log(` *Using WEBPACK DEV MIDDLEWARE for STATIC BUILD ASSETS*`);
    } else {
        console.log(` *Using STATIC BUILD ASSETS*`);
    }
    console.log(
        chalk.bold.cyan(
            '**********************************************************'
        )
    );
    console.log(
        chalk.bold.cyan(
            '**********************************************************'
        )
    );

    if (nodeEnv === 'development') {
        console.log();
        console.log(
            chalk.bold.magenta('Webpack is bundling. This may take a minute...')
        );
    }
}
