// require('../common/assets/styles/main.scss');
declare var module: any;
import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from '../common/routes';

const container = document.getElementById('root');

const renderApp = component =>
	render(
		<AppContainer>
			<Router>
				<Routes />
			</Router>
		</AppContainer>,
		container
	);

renderApp(Routes);

if (module.hot) {
	module.hot.accept(() => renderApp(Routes));
}
