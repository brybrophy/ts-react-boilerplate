import React from 'react';
import { Route, Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// ---- Dynamic Imports for Code splitting ---- //
const HomePage = importedComponent(() => import('./components/HomePage'));
HomePage.preload();

const NotFoundPage = importedComponent(() => import('./components/NotFoundPage'));
NotFoundPage.preload();
// ------------------- End ------------------- //

export default class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/not-found" component={NotFoundPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}
