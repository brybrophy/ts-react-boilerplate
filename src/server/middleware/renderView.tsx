'use strict';
import { Request } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';
import * as CircularJson from 'circular-json';
const hashedAssetsPaths = require('../config/webpack-assets.json');

import { StaticRouter as Router } from 'react-router-dom';
import Routes from '../../common/routes';

export default function renderView(req: Request, rootStore: any) {
	const context = {};

	const componentHTML = renderToString(
		<Provider rootStore={rootStore}>
			<Router location={req.originalUrl} context={context}>
				<Routes />
			</Router>
		</Provider>
	);

	let HTML = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>React Express TypeScript Starter</title>
                    <link rel="stylesheet" type="text/css" href="/assets/styles.css">
					<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900i" rel="stylesheet">
					
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
				<!-- Add initial mobx state to window object -->
				<script>
					window.__INITIAL_STATE__ = ${CircularJson.stringify({ rootStore: rootStore })};
				</script>
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
