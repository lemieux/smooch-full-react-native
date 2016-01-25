import React, { Component } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { immediateUpdate } from '../services/user-service';
import { hideSettings } from '../actions/app-state-actions';

export class SettingsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.user.email,
            hasError: false
        };

        this.onChange = this.onChange.bind(this);
        this.save = this.save.bind(this);
    }

    onChange(e) {
        this.setState({
            email: e.target.value,
            hasError: false
        });
    }

    save(e) {
        e.preventDefault();

        // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const email = this.state.email;

        var isValid = regex.test(email);

        if (isValid) {
            return immediateUpdate({
                email: email
            }).then(() => {
                this.props.actions.hideSettings();
            });
        } else {
            return Promise.resolve().then(() => {
                this.setState({
                    hasError: true
                });
            });
        }
    }

    render() {
        let hasError = this.state.hasError;

        let button = this.props.appState.readOnlyEmail ? null : (
            <div className="input-group">
                <button ref="button"
                        disabled={ hasError }
                        type="button"
                        className="btn btn-sk-primary"
                        onClick={ this.save }>
                    { this.props.ui.text.settingsSaveButtonText }
                </button>
            </div>
            );

        return (
            <div className="sk-settings">
                <div className="settings-wrapper">
                    <p ref="description">
                        { this.props.appState.readOnlyEmail ? this.props.ui.text.settingsReadOnlyText : this.props.ui.text.settingsText }
                    </p>
                    <form onSubmit={ this.save }>
                        <div className={ hasError ? 'input-group has-error' : 'input-group' }>
                            <i className="fa fa-envelope-o before-icon"></i>
                            <input disabled={ this.props.appState.readOnlyEmail }
                                   ref="input"
                                   type="text"
                                   placeholder={ this.props.ui.text.settingsInputPlaceholder }
                                   className="input email-input"
                                   onChange={ this.onChange }
                                   defaultValue={ this.props.user.email } />
                        </div>
                        { button }
                    </form>
                </div>
            </div>
            );
    }
}

export const Settings = connect((state) => {
    return {
        ui: state.ui,
        appState: state.appState,
        user: state.user
    };
}, (dispatch) => {
    return {
        actions: bindActionCreators({
            hideSettings
        }, dispatch)
    };
})(SettingsComponent);
