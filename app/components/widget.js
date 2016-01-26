import { connect } from 'react-redux';

import React, { StyleSheet, Component, Text, View } from 'react-native';

import { Header } from './header';
import { Conversation } from './conversation';
import { Settings } from './settings';
import { Notification } from './notification';
import { ErrorNotification } from './error-notification';
import { ChatInput } from './chat-input';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    content: {
        flex: 1
    },
    conversation: {
    },
    footer: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export class WidgetComponent extends Component {

    render() {
        const settingsComponent = this.props.appState.settingsVisible ? <Settings /> : null;
        const footer = this.props.appState.settingsVisible ? null : <ChatInput />;

        // We check for `undefined` explicitely because it means the widget is in it's default state
        // It was never opened nor closed. `sk-appear` and `sk-close` expect to be in one or the other state
        // for their animations. The animation can go from undefined to `sk-appear`, `sk-appear` to `sk-close`, and
        // `sk-close` to `sk-appear`. If it starts with `sk-close`, it starts by being opened and animates to close state.
        let className = this.props.appState.widgetOpened === null ? '' :
            this.props.appState.widgetOpened ? 'sk-appear' : 'sk-close';

        let notification = this.props.appState.errorNotificationMessage ?
            <ErrorNotification message={ this.props.appState.errorNotificationMessage } /> :
            this.props.appState.settingsNotificationVisible ?
                <Notification /> :
                null;

        return (
            <View style={ styles.container }>
                <Header style={ styles.header } />
                <View style={ styles.content }>
                    <Conversation style={ styles.conversation } />
                </View>
                <View style={ styles.footer }>
                    <ChatInput />
                </View>
            </View>
            );
    }
}

export const Widget = connect((state) => {
    return {
        appState: state.appState
    };
})(WidgetComponent);
