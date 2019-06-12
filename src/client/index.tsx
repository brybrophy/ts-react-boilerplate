import './assets/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';

const container = document.getElementById('root');
const renderApp = (_component: typeof App) =>
    render(
        <AppContainer>
            <App />
        </AppContainer>,
        container
    );

renderApp(App);
