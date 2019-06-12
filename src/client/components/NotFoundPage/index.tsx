import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFoundPage: FC<INotFoundPageProps> = props => {
    return (
        <main className="not-found-page">
            <h1>Page Not Found</h1>
        </main>
    );
};

export interface INotFoundPageProps extends RouteComponentProps<any> {}
export default NotFoundPage;
