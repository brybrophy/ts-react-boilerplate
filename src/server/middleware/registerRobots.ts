'use strict';

import { Application, Request, Response, NextFunction } from 'express';

export default function registerRobots(server: Application) {
    server.get(
        '/robots.txt',
        (req: Request, res: Response, next: NextFunction) => {
            const CFG = server.locals.CFG;
            const allow =
                CFG.ENV.SEO_ENV === 'production' ? 'Allow' : 'Disallow';
            const robotsText = `User-agent: * ${allow}: /`;

            res.type('text/plain');
            res.send(robotsText);
        }
    );
}
