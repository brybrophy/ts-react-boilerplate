import Express from 'express';
import { Application } from 'express';
import path from 'path';

export default function configureStaticFileServer(server: Application) {
    const { ASSETS, CACHE } = server.locals.CFG;
    const distDir = ASSETS.DIRS.dist;

    // TODO: Figure out how to properly type this instance of "res"
    function setCacheControlByPath(res: any, path: string, stat: any) {
        function urlStartsWith(text: string) {
            return res.req.originalUrl.indexOf(text) == 0;
        }

        if (urlStartsWith('/images')) {
            return res.setHeader('Cache-Control', CACHE.images.header);
        }
        if (urlStartsWith('/static')) {
            return res.setHeader('Cache-Control', CACHE.static.header);
        }
        if (urlStartsWith('/favicon.ico')) {
            return res.setHeader('Cache-Control', CACHE.images.header);
        }

        return res.setHeader('Cache-Control', CACHE.default.header);
    }

    server.use(Express.static(distDir, { setHeaders: setCacheControlByPath }));
    server.use('/static', Express.static(path.resolve(__dirname, 'static')));
    server.use('/images', Express.static(path.resolve(__dirname, 'images')));
}
