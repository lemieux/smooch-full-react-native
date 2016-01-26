import { URI, Client } from 'faye/browser/faye-browser';
import { urljoin } from './url';
import { http } from './http';

import { store } from '../stores/app-store';
import { addMessage } from '../actions/conversation-actions';

function extractJsonpCallback(url) {
    const parsedUrl = URI.parse(url);
    const callbackName = parsedUrl.query.jsonp;
    return {
        callback: global[callbackName],
        name: callbackName
    };
}

function extractCallbackPayload(callbackName, body) {
    var json = body.replace(`/**/${callbackName}(`, '').replace(');', '');
    var parsedJson = JSON.parse(json);
    parsedJson[0].supportedConnectionTypes = ['websocket'];
    return parsedJson;
}


global.document = {
    getElementsByTagName: () => {
        return [{
            appendChild: (c) => {
                const {callback, name} = extractJsonpCallback(c.src);
                http('GET', c.src).then((response) => {
                    const payload = extractCallbackPayload(name, response);
                    callback(payload);
                });
            }

        }]
    },
    createElement: (type) => {
        return {
            type,
            parentNode: {
                removeChild: () => {
                }
            }
        }
    }
}


export function initFaye() {
    const state = store.getState();

    if (!state.faye.subscription) {
        const url = urljoin(state.appState.serverURL, 'faye');
        window.location = URI.parse(url);
        var faye = new Client(url);

        faye.addExtension({
            outgoing: (message, callback) => {
                if (message.channel === '/meta/subscribe') {
                    message.appUserId = state.user._id;

                    if (state.auth.appToken) {
                        message.appToken = state.auth.appToken;
                    }

                    if (state.auth.jwt) {
                        message.jwt = state.auth.jwt;
                    }
                }

                callback(message);
            }
        });

        return faye.subscribe('/conversations/' + state.conversation._id, (message) => {
            store.dispatch(addMessage(message));
        });
    }
}
