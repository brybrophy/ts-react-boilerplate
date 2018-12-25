import { Request, Response, NextFunction } from 'express';
import sm from 'sitemap';
import RoutesService from '../services/routesService';

export default (_req: Request, res: Response, _next: NextFunction): any => {
    const routesService = new RoutesService();
    const urls = routesService.getAllRoutes().map((route: string) => {
        return { url: route };
    });

    const sitemap = sm.createSitemap({
        hostname: 'ADD_HOSTNAME_HERE',
        urls
    });

    return sitemap.toXML((err: Error, xml: XMLDocument) =>
        err ? res.status(500).end() : res.type('application/xml').send(xml)
    );
};
