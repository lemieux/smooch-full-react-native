import React, { Component } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { hideSettingsNotification, showSettings } from '../actions/app-state-actions';

export class NotificationComponent extends Component {
    onLinkClick(e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.actions.hideSettingsNotification();
        this.props.actions.showSettings();
    }

    render() {
        return (
            <div key='content' className='sk-notification' onClick={ this.props.actions.hideSettingsNotification }>
                <p>
                    <span ref='text' dangerouslySetInnerHTML={ createMarkup(this.props.ui.text.settingsNotificationText) }></span>
                    <a href='#' className='sk-notification-close' onClick={ this.props.actions.hideSettingsNotification }>&times;</a>
                </p>
            </div>
            );
    }
}

export const Notification = connect((state) => {
    return {
        ui: state.ui
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            hideSettingsNotification,
            showSettings
        }, dispatch)
    };
})(NotificationComponent);
