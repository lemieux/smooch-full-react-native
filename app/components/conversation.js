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
            dataSource: ds.cloneWithRows(this.props.conversation.messages),
            contentSize: {}
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            dataSource: ds.cloneWithRows(props.conversation.messages),
        });
    }

    componentDidMount() {
        setTimeout(this.scrollToBottom.bind(this));
    }

    componentDidUpdate() {
        setTimeout(this.scrollToBottom.bind(this));
    }

    onContentSizeChange(width, height) {
        this.setState({
            contentSize: {
                width,
                height
            }
        });
    }

    scrollToBottom() {
        this.refs.list.getScrollResponder().scrollTo(this.state.contentSize.height);
    }

    render() {
        return <ListView ref="list"
                         style={ this.props.style }
                         dataSource={ this.state.dataSource }
                         initialListSize={ this.props.conversation.messages.length }
                         onContentSizeChange={ this.onContentSizeChange.bind(this) }
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
