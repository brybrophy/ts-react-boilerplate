import * as React from 'react';
import HomePageStore from '../stores/containers/HomePageStore';

export default class HomePage extends React.Component {
    private _store: HomePageStore;

    constructor(props) {
        super(props);

        this._store = props.stores.homePageStore;
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
