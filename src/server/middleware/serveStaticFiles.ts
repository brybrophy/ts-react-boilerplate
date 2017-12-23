import * as Express from 'express';
import * as path from 'path';

export default function configureStaticFileServer(server: Express.Application) {
    const { ASSETS, CACHE } = server.locals.CFG;
    const distDir = ASSETS.DIRS.dist;

    function setCacheControlByPath(res, path, stat) {
        function urlStartsWith(text) {
            return res.req.url.indexOf(text) == 0;
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
