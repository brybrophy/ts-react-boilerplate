import React, { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const HomePage: FC<IHomePageProps> = props => {
    const [message, setMessage] = useState('...');
    useEffect(() => setMessage('Hello World'), []);
    return (
        <main className="home-page">
            <h1>{message}</h1>
        </main>
    );
};

export interface IHomePageProps extends RouteComponentProps<any> {}
export default HomePage;
