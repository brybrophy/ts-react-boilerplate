import './assets/styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import Stores from './stores';

const stores = new Stores();
const container = document.getElementById('root');
const renderApp = (component: typeof App) =>
    render(
        <AppContainer>
            <Provider stores={stores}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </AppContainer>,
        container
    );

renderApp(App);

if (module.hot) {
    module.hot.accept(() => renderApp(App));
}
