import * as React from 'react';

export default class HomePage extends React.Component {
    private _stores: any;

    constructor(props) {
        super(props);

        this._stores = props.stores.homePage;
    }

    render() {
        const { countDisplay } = this._stores;

        return <h1>{countDisplay}</h1>;
    }
}
