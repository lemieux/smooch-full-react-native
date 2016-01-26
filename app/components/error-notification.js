import React, { Component } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { hideErrorNotification } from '../actions/app-state-actions';

export class ErrorNotificationComponent extends Component {
    render() {
        return (
            <div key='content' className='sk-notification sk-notification-error' onClick={ this.props.actions.hideErrorNotification }>
                <p>
                    <span ref='text' dangerouslySetInnerHTML={ createMarkup(this.props.message) }></span>
                    <a href='#' className='sk-notification-close'>&times;</a>
                </p>
            </div>
            );
    }
}

export const ErrorNotification = connect(undefined, (dispatch) => {
    return {
        actions: bindActionCreators({
            hideErrorNotification
        }, dispatch)
    };
})(ErrorNotificationComponent);
