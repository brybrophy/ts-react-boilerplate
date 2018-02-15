import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import HomePage from '../containers/HomePage';
import NotFoundPage from '../containers/NotFoundPage';

@inject('stores')
@observer
export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <HomePage {...this.props} />}
                />
                <Route component={NotFoundPage} />
            </Switch>
        );
    }
}
