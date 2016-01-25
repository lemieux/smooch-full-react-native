'use strict';
import React, { AppRegistry, Component, Text, View } from 'react-native';

import { Provider } from 'react-redux';

import { store } from './app/stores/app-store';

import { Widget } from './app/components/widget'

class SmoochReactNative extends Component {
    render() {
        return (
            <Provider store={ store }>
                <Widget />
            </Provider>
            );
    }
}

AppRegistry.registerComponent('SmoochReactNative', () => SmoochReactNative);
