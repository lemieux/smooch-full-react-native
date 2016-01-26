import React, { Component, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import { ActionComponent } from './action';

const styles = {
    user: {
        bubble: {
            backgroundColor: '#9200aa',
            borderColor: '#76008a',
            margin: 15,
            padding: 15,
            elevation: 1
        },
        text: {
            color: '#ffffff'
        }
    },
    maker: {
        bubble: {
            backgroundColor: '#ffffff',
            marginLeft: 15,
            marginRight: 15,
            padding: 15,
            elevation: 1,
            flex: 1
        },
        avatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            flex: 1
        },
        text: {
            color: '#212121'
        },
        from: {
            marginLeft: 15
        }
    }
};

export class MessageComponent extends Component {
    render() {
        const actions = this.props.actions.map((action) => {
            return <ActionComponent key={ action._id } {...action} />;
        });

        const isAppUser = this.props.role === 'appUser';
        let style = isAppUser ? styles.user : styles.maker;

        let avatar = isAppUser ? null : <Image style={ style.avatar } source={ {    uri: this.props.avatarUrl} } />;
        let name = isAppUser ? null : <Text style={ style.from }>
                                          { this.props.name }
                                      </Text>;

        return (
            <View>
                { name }
                <View style={ style.bubble }>
                    <Text style={ style.text }>
                        { this.props.text }
                    </Text>
                </View>
                { avatar }
            </View>
            );
            // <div className={ 'sk-row ' + (isAppUser ? 'sk-right-row' : 'sk-left-row') }>
            //     { avatar }
            //     <div className='sk-msg-wrapper'>
            //         <div className='sk-from'>
            //             { isAppUser ? '' : this.props.name }
            //         </div>
            //         <div className='sk-msg'>
            //             { text }
            //             { actions }
            //         </div>
            //     </div>
            //     <div className='sk-clear'></div>
            // </div>
    }
}
