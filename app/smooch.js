import { AsyncStorage } from 'react-native';
import uuid from 'uuid';
import pick from 'lodash.pick';

import { store } from './stores/app-store';

import { setAuth, resetAuth } from './actions/auth-actions';
import { setUser, resetUser } from './actions/user-actions';
import { setPublicKeys, setStripeInfo } from './actions/app-actions';
import { updateText } from './actions/ui-actions';
import { setConversation, resetConversation } from './actions/conversation-actions';
import { openWidget, closeWidget, showSettingsNotification, enableSettings, disableSettings, hideSettings, setServerURL, setEmailReadonly, unsetEmailReadonly, updateReadTimestamp } from './actions/app-state-actions';
import { reset } from './actions/common-actions';

import { login as authLogin } from './services/auth-service';
import { getAccount } from './services/stripe-service';
import { EDITABLE_PROPERTIES, trackEvent, update as serviceUpdateUser, immediateUpdate as immediateUpdateUser } from './services/user-service';
import { getConversation, sendMessage as _sendMessage, connectFaye, disconnectFaye } from './services/conversation-service';


async function getDeviceId() {
    const SK_STORAGE = 'sk_deviceid';
    // let deviceId = await AsyncStorage.getItem(SK_STORAGE);
    //
    // deviceId = deviceId || uuid.v4().replace(/-/g, '');
    //
    // await AsyncStorage.setItem(SK_STORAGE, deviceId);

    return SK_STORAGE;
}

export function init(props) {
    this.appToken = props.appToken;
    store.dispatch(enableSettings());
    return login(props.userId, props.jwt, pick(props, EDITABLE_PROPERTIES));
}

export async function login(userId = '', jwt, attributes) {
    if (arguments.length === 2 && typeof jwt === 'object') {
        attributes = jwt;
        jwt = undefined;
    } else if (arguments.length < 3) {
        attributes = {};
    }

    // in case it comes from a previous authenticated state
    store.dispatch(resetAuth());
    store.dispatch(resetUser());
    store.dispatch(resetConversation());
    disconnectFaye();

    attributes = pick(attributes, EDITABLE_PROPERTIES);

    let deviceId = await getDeviceId();

    return Promise.resolve().then(() => {
        store.dispatch(setAuth({
            jwt: jwt,
            appToken: this.appToken
        }));

        return authLogin({
            userId: userId,
            device: {
                platform: 'other',
                id: deviceId,
                info: {
                    sdkVersion: '0.0.1',
                    userAgent: 'react-native'
                }
            }
        });
    }).then((loginResponse) => {
        store.dispatch(setUser(loginResponse.appUser));

        if (loginResponse.publicKeys) {
            store.dispatch(setPublicKeys(loginResponse.publicKeys));

            if (loginResponse.publicKeys.stripe) {
                return getAccount().then((r) => {
                    store.dispatch(setStripeInfo(r.account));
                }).catch(() => {
                    // do nothing about it and let the flow continue
                });
            }
        }
    }).then(() => {
        return immediateUpdateUser(attributes).then(() => {
            const user = store.getState().user;
            if (user.conversationStarted) {
                return getConversation().then(connectFaye);
            }
        });
    });
}

export function logout() {
    return login();
}

export function track(eventName, userProps) {
    return trackEvent(eventName, userProps);
}

export function sendMessage(...args) {
    return _sendMessage(...args)
}

export function updateUser(props) {
    return serviceUpdateUser(props).then((response) => {
        if (response.appUser.conversationStarted) {
            return handleConversationUpdated().then(() => {
                return response;
            });
        }

        return response;
    });
}
