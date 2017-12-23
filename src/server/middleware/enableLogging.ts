'use strict';

import { Application } from 'express';
import * as morgan from 'morgan';

// Use differrent levels of logging based on the environment.
export default function enableLogging(server: Application) {
    switch (server.get('env')) {
        case 'development':
            server.use(morgan('dev'));
            break;

        case 'production':
            server.use(morgan('short'));
            break;

        default:
    }
}
