'use strict';

import * as morgan from 'morgan';

// Use differrent levels of logging based on the environemt.
export default function enableLogging(app) {
	switch (app.get('env')) {
		case 'development':
			app.use(morgan('dev'));
			break;

		case 'production':
			app.use(morgan('short'));
			break;

		default:
	}
}
