import React, { Component, ListView, Text } from 'react-native';
import { connect } from 'react-redux';

import { MessageComponent } from './message';


const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export class ConversationComponent extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            logoIsAnchored: true,
            dataSource: ds.cloneWithRows(this.props.conversation.messages),
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: ds.cloneWithRows(props.conversation.messages),
        })
    }

    render() {
        return <ListView style={ this.props.style }
                         dataSource={ this.state.dataSource }
                         renderHeader={ props => <Text>
                                                     { this.props.ui.text.introText }
                                                 </Text> }
                         renderRow={ props => <MessageComponent {...props} /> } />;
    }
}

export const Conversation = connect((state) => {
    return {
        ui: state.ui,
        conversation: state.conversation
    };
})(ConversationComponent);
