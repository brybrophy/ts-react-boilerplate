import React from 'react';
import * as ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { IStores, IAppStore } from '../../../stores/index.d';

export interface IProps {
    children: JSX.Element | JSX.Element[];
    store: IAppStore;
    theme: 'dark' | 'light';
}

export default class ScrollWrapper extends React.Component<IProps, {}> {
    private _store: IAppStore;
    private _domElement: any;

    constructor(props: IProps) {
        super(props);

        this._store = props.store;
        this._domElement = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this._handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
    }

    @autobind
    private _handleScroll() {
        const { children } = this._domElement.current;
        const { top } = children[0].getBoundingClientRect();
        const { bottom } = children[
            children.length - 1
        ].getBoundingClientRect();

        return this._triggerNavColorChange(top, bottom);
    }

    @autobind
    private _triggerNavColorChange(top: number, bottom: number): void {
        if (top <= 90 && bottom > 90) {
            if (this._store.mainNavTheme !== this.props.theme) {
                this._store.setMainNavTheme(this.props.theme);
            }
        }
    }

    render() {
        return <div ref={this._domElement}>{this.props.children}</div>;
    }
}
