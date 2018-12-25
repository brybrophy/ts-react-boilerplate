import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';

interface IProps extends RouteComponentProps<any> {}

export default class HomePage extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    componentWillMount() {
        scrollTopOnPush(this.props.history.action);
    }

    render() {
        return (
            <main className="home-page">
                <h1>Home Page</h1>
            </main>
        );
    }
}
