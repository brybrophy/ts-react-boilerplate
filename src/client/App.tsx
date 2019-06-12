import React, { FC } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import importedComponent from 'react-imported-component';

// ---- Dynamic Imports for Code splitting ---- //
const HomePage = importedComponent(() => import('./components/HomePage'));

const NotFoundPage = importedComponent(() =>
    import('./components/NotFoundPage')
);
// ------------------- End ------------------- //

const App: FC<{}> = () => {
    return (
        <div id="app">
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/not-found" component={NotFoundPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Router>
        </div>
    );
};

export default hot(module)(App);
