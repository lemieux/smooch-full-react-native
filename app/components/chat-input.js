import React, { View, Text, Platform, StyleSheet, TouchableHighlight, TouchableNativeFeedback, Component, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { sendMessage, getReadTimestamp, updateReadTimestamp } from '../services/conversation-service';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
    },
    button: {
    },
    buttonText: {
        width: 50
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
            sendMessage(text);
        }
    }

    render() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View style={ styles.container }>
                <TextInput placeholder={ this.props.ui.text.inputPlaceholder }
                           style={ styles.input }
                           onChangeText={ (text) => this.setState({
                                                  text
                                              }) }
                           value={ this.state.text } />
                       <TouchableElement style={ styles.button } onPress={ this.onSendMessage } >
                    <View>
                        <Text style={ styles.buttonText }>
                            { this.props.ui.text.sendButtonText }
                        </Text>
                    </View>
                </TouchableElement>
            </View>
            );
    }
}

export const ChatInput = connect((state) => {
    return {
        ui: state.ui
    };
})(ChatInputComponent);
