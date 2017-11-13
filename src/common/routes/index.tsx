import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

@inject('rootStore')
@observer
export default class Routes extends React.Component {
	render() {
		console.log(this.props);
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
