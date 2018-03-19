import React from 'react';
import { inject, observer } from 'mobx-react';
import { IHomePageProps, IHomePageStore } from '../interfaces';

@inject('stores')
@observer
export default class HomePage extends React.Component {
    private _store: IHomePageStore;

    constructor(props: IHomePageProps) {
        super(props);

        this._store = props.stores.homePageStore;
    }

    componentDidMount() {
        this.handleIncrementCount();
    }

    handleIncrementCount() {
        this._store.counter.addOne();

        setTimeout(() => {
            this.handleIncrementCount();
        }, 2000);
    }

    render() {
        const { countDisplay } = this._store;

        return (
            <div>
                <h1>{countDisplay}</h1>
                <h2>{countDisplay}</h2>
                <h3>{countDisplay}</h3>
                <h4>{countDisplay}</h4>
                <h5>{countDisplay}</h5>
                <h6>{countDisplay}</h6>
                <small>{countDisplay}</small>
            </div>
        );
    }
}
