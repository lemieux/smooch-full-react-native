import React, { View, Text, Platform, StyleSheet, Component, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { sendMessage } from '../services/conversation-service';
import Button from 'apsl-react-native-button'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
    },
    button: {
        borderColor: 'transparent',
        height: 56,
        width: 75
    }
});

export class ChatInputComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            text: ''
        };

        this.onSendMessage = this.onSendMessage.bind(this);
    }

    onSendMessage(e) {
        const text = this.state.text;
        if (text.trim()) {
            this.setState({
                text: ''
            });
            sendMessage(text).then(e => {
                console.log(e)
            }).catch(e => {
                console.log(e)
            });
        }
    }

    render() {
        return (
            <View style={ styles.container }>
                <TextInput placeholder={ this.props.ui.text.inputPlaceholder }
                           style={ styles.input }
                           onChangeText={ (text) => this.setState({
                                                  text
                                              }) }
                           value={ this.state.text } />
                <Button style={ styles.button } onPress={ this.onSendMessage }>
                    { this.props.ui.text.sendButtonText }
                </Button>
            </View>
            );
    }
}

export const ChatInput = connect((state) => {
    return {
        ui: state.ui
    };
})(ChatInputComponent);
