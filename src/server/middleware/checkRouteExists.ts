import { Request, Response, NextFunction } from 'express';
import RoutesService from '../services/routesService';

export default function checkRouteExists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const routesService = new RoutesService();
    const routes = routesService.getAllRoutes();

    // NOTE: Uncomment this once you have some routes to check.
    
    // if (req.baseUrl && !routes.includes(req.baseUrl)) {
    //     res.statusCode = 404;
    // }

    next();
}
