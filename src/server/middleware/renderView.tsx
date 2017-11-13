'use strict';
import { Request } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
// import { Provider } from 'mobx-react';
// import * as CircularJson from 'circular-json';
const hashedAssetsPaths = require('../config/webpack-assets.json');

import { StaticRouter as Router } from 'react-router-dom';
import Routes from '../../common/routes';

export default function renderView(req: Request) {
	const context = {};

	const componentHTML = renderToString(
		<Router location={req.originalUrl} context={context}>
			<Routes />
		</Router>
	);

	let HTML = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>React Express TypeScript Starter</title>
                    <link rel="stylesheet" type="text/css" href="/assets/styles.css">

                    <!-- PHP script to remove date from meta description on Google -->
                    <script language="javascript">
                        document.write("<?php the_time('F j, Y') ?>");
                    </script>`;

	if (process.env.NODE_ENV !== 'production') {
		HTML += `
                </head>
                <body>
                    <div id="root"></div>
                    <script type="application/javascript" src="bundle.js"></script>
                </body>
            </html>
        `;
	} else {
		HTML += `
                </head>
                <body>
                    <div id="root">${componentHTML}</div>
                    <script type="application/javascript" src=${hashedAssetsPaths.main.js}></script>
                </body>
            </html>
        `;
	}

	return HTML;
}
