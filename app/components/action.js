import React, { Component } from 'react-native';

import { LoadingComponent } from './loading';

export class ActionComponent extends Component {

    render() {
        let isJavascript = this.props.uri.startsWith('javascript:');

        return (
            <div className='sk-action'>
                <a className='btn btn-sk-primary' href={ this.props.uri } target={ isJavascript ? '_self' : '_blank' }>
                    { this.props.text }
                </a>
            </div>
            );
    }
}
