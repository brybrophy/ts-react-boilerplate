import { Request, Response, NextFunction } from 'express';
import sm from 'sitemap';
import RoutesService from '../services/routesService';

export default (_req: Request, res: Response, _next: NextFunction) => {
    const routesService = new RoutesService();
    const urls = routesService.getAllRoutes().map((route: string) => {
        return { url: route };
    });

    const sitemap = sm.createSitemap({
        hostname: 'ADD_HOSTNAME_HERE',
        urls
    });

    return sitemap.toXML(
        (err, xml) =>
            err ? res.status(500).end() : res.type('application/xml').send(xml)
    );
};
