import * as React from 'react';

export default class HomePage extends React.Component<any, any> {
	render() {
		const { count } = this.props.rootStore;

		return <h1>{count} were added to the count on the server</h1>;
	}
}
