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

        return <h1>{countDisplay}</h1>;
    }
}
