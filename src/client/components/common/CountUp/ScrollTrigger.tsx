import React from 'react';
import autobind from 'autobind-decorator';
import VisibilitySensor from 'react-visibility-sensor';

interface IProps {
    children: JSX.Element | JSX.Element[];
    onEnter: any;
    disableOnLoad: number;
}

export default class ScrollTrigger extends React.Component<IProps, {}> {
    private _active: boolean;

    constructor(props: IProps) {
        super(props);

        this._active = false;
    }

    componentDidMount() {
        setTimeout(() => {
            this._active = true;
        }, this.props.disableOnLoad || 0);
    }

    @autobind
    private _handleIsVisible(isVisible: boolean) {
        if (isVisible && this._active) {
            this.props.onEnter();
            this._active = false;
        }
    }

    render() {
        return (
            <VisibilitySensor
                onChange={this._handleIsVisible}
                partialVisibility={true}
                offset={{ top: 20 }}
            >
                {this.props.children}
            </VisibilitySensor>
        );
    }
}
