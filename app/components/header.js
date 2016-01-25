import React, { Component, ToolbarAndroid, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleWidget, showSettings, hideSettings } from '../actions/app-state-actions';

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#e9eaed',
        height: 56
    }
});

export class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.actions = this.props.actions;

        this.showSettings = this.showSettings.bind(this);
        this.hideSettings = this.hideSettings.bind(this);
    }

    showSettings() {
        this.actions.showSettings();
    }

    hideSettings() {
        this.actions.hideSettings();
    }

    render() {
        let {settingsEnabled, settingsVisible, widgetOpened} = this.props.appState;
        let {settingsHeaderText, headerText} = this.props.ui.text;

        const settingsTextStyle = {
            display: 'inline-block',
            height: 30
        };

        const settingsText = <div style={ settingsTextStyle } onClick={ this.hideSettings }>
                                 { settingsHeaderText }
                             </div>;

        const actions = [];

        return (
            <ToolbarAndroid style={ styles.toolbar }
                            title={ settingsVisible ? settingsText : headerText }
                            actions={ actions }
                            onActionSelected={ this.onActionSelected } />
            );
    }
    onActionSelected(position) {
        if (position === 0) { // index of 'Settings'
            showSettings();
        }
    }
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        appState: state.appState,
        conversation: state.conversation
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            toggleWidget,
            showSettings,
            hideSettings
        }, dispatch)
    };
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
