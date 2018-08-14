import React from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { IStores } from '../../stores';
import { IAppStore } from '../../stores/common/AppStore';
import { IHomePageStore } from '../../stores/containers/HomePageStore';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import MetaProvider from '../common/MetaProvider';

export interface IProps {
    stores: IStores;
}

@inject('stores')
@observer
export default class HomePage extends React.Component<IProps, {}> {
    private _appStore: IAppStore;
    private _store: IHomePageStore;

    constructor(props: IProps) {
        super(props);

        this._appStore = props.stores.app;
        this._store = props.stores.home;
    }

    componentWillMount() {
        this._store.meta.setCanonicalUrl(window.location.href);
        this._trackPageView();

        scrollTopOnPush(this.props.history.action);
    }

    @autobind
    private _trackPageView() {
        const { origin, pathname } = window.location;

        this._appStore.analytics.sendPageView(pathname, origin, 'HomePage');
    }

    render() {
        return (
            <main className="not-found-page">
                <MetaProvider meta={this._store.meta} />
                <h1>Home Page</h1>
            </main>
        );
    }
}
