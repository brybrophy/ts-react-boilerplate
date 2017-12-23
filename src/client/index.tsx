require('../common/assets/styles/main.scss');
declare var module: any;
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from '../common/routes';
import RootStore from '../common/mobx/stores';

declare var window: {
    __INITIAL_STATE__: Object;
    location: {
        pathname: string;
    };
};

const rootStore = new RootStore(window.__INITIAL_STATE__);
const container = document.getElementById('root');
const renderApp = component =>
    render(
        <AppContainer>
            <Provider rootStore={rootStore}>
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
