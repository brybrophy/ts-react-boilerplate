import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
				{/* HomePage */}
				<Route exact path="/" component={Home} />

				{/* 404 Error page */}
				<Route component={NotFound} />
			</Switch>
		);
	}
}
