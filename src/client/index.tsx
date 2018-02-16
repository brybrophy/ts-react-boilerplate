require('../common/assets/styles/main.scss');
declare var module: any;
import '../common/stores';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from '../common/routes';
import Stores from '../common/stores';

declare var window: {
    __INITIAL_STATE__: {};
    location: {
        pathname: string;
    };
};

const stores = new Stores(window.__INITIAL_STATE__);
const container = document.getElementById('root');
const renderApp = component =>
    render(
        <AppContainer>
            <Provider stores={stores}>
                <Router>
                    <Routes />
                </Router>
            </Provider>
        </AppContainer>,
        container
    );

renderApp(Routes);

if (module.hot) {
    module.hot.accept(() => renderApp(Routes));
}
