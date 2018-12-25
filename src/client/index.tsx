import './assets/styles/main.scss';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const container = document.getElementById('root');
const renderApp = (component: typeof App) =>
    render(
        <AppContainer>
            <Router>
                <App />
            </Router>
        </AppContainer>,
        container
    );

renderApp(App);

if (module.hot) {
    module.hot.accept(() => renderApp(App));
}
