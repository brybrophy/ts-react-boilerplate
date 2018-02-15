import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import NotFoundPage from '../containers/NotFoundPage';

export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}
