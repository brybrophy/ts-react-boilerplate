import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';

interface IProps extends RouteComponentProps<any> {}

export default class NotFoundPage extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    componentWillMount() {
        scrollTopOnPush(this.props.history.action);
    }

    render() {
        return (
            <main className="not-found-page">
                <h1>Page Not Found</h1>
            </main>
        );
    }
}
