'use strict';

import { Request, Response } from 'express';

export default function registerRobots(req: Request, res: Response) {
    const { envConfig } = req.app.locals;
    const allow = envConfig.SEO_ENV === 'production' ? 'Allow' : 'Disallow';
    const robotsText = `User-agent: * ${allow}: /`;

    res.type('text/plain');
    res.send(robotsText);
}
