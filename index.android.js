'use strict';
import React, { AppRegistry, Component } from 'react-native';

import { Provider } from 'react-redux';

import { store } from './app/stores/app-store';

import { Widget } from './app/components/widget'
import { init } from './app/smooch';

class SmoochReactNative extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Widget />
            </Provider>
            );
    }
}

init({
    appToken: '6ylwum5xmkd2bh8t171426773'
}).catch((e) => {
    console.log(e)
} );

AppRegistry.registerComponent('SmoochReactNative', () => SmoochReactNative);
