import React from 'react';
import { inject, observer } from 'mobx-react';
import autobind from 'autobind-decorator';
import { IStores } from '../../stores';
import { IAppStore } from '../../stores/common/AppStore';
import { INotFoundPageStore } from '../../stores/containers/NotFoundPageStore';
import { scrollTopOnPush } from '../../../common/utils/navigationUtils';
import MetaProvider from '../common/MetaProvider';

export interface IProps {
    stores: IStores;
}

@inject('stores')
@observer
export default class NotFoundPage extends React.Component<IProps, {}> {
    private _appStore: IAppStore;
    private _store: INotFoundPageStore;

    constructor(props: IProps) {
        super(props);

        this._appStore = props.stores.app;
        this._store = props.stores.notFound;
    }

    componentWillMount() {
        this._store.meta.setCanonicalUrl(window.location.href);
        this._trackPageView();

        scrollTopOnPush(this.props.history.action);
    }

    @autobind
    private _trackPageView() {
        const { origin, pathname } = window.location;

        this._appStore.analytics.sendPageView(pathname, origin, 'NotFoundPage');
    }

    render() {
        return (
            <main className="not-found-page">
                <MetaProvider meta={this._store.meta} />
                <h1>Not Found</h1>
            </main>
        );
    }
}
