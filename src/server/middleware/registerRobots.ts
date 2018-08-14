'use strict';

import { Request, Response } from 'express';

export default function registerRobots(req: Request, res: Response) {
    const CFG = req.app.locals.CFG;
    const allow = CFG.ENV.SEO_ENV === 'production' ? 'Allow' : 'Disallow';
    const robotsText = `User-agent: * ${allow}: /`;

    res.type('text/plain');
    res.send(robotsText);
}
