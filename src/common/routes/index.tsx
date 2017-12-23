import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

// @withRouter
@inject('rootStore')
@observer
export default class Routes extends React.Component {
    render() {
        return (
            <Switch>
                {/* HomePage */}
                <Route exact path="/" render={() => <Home {...this.props} />} />

                {/* 404 Error page */}
                <Route component={NotFound} />
            </Switch>
        );
    }
}
