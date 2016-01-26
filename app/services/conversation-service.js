import { store } from '../stores/app-store';
import { addMessage, setConversation } from '../actions/conversation-actions';
import { updateReadTimestamp as updateReadTimestampAction, showSettingsNotification } from '../actions/app-state-actions';
import { setFayeSubscription, unsetFayeSubscription } from '../actions/faye-actions';
import { core } from '../services/core';
import { immediateUpdate } from '../services/user-service';
import { initFaye } from '../utils/faye';

export function sendMessage(text) {
    var sendFn = () => {
        // add an id just to please React
        // this message will be replaced by the real one on the server response
        const message = {
            _id: Math.random(),
            text: text,
            role: 'appUser'
        };

        store.dispatch(addMessage(message));

        const user = store.getState().user;

        return core().conversations.sendMessage(user._id, message).then((response) => {
            store.dispatch(setConversation(response.conversation));
            return response;
            console.log(store.getState());
        });
    };

    var promise = immediateUpdate(store.getState().user);
    if (store.getState().user.conversationStarted) {
        return promise
            .then(connectFaye)
            .then(sendFn);
    }

    // if it's not started, send the message first to create the conversation,
    // then get it and connect faye
    return promise
        .then(sendFn)
        .then(connectFaye);
}

export function getConversation() {
    const user = store.getState().user;
    return core().conversations.get(user._id).then((response) => {
        store.dispatch(setConversation(response.conversation));
        return response;
    });
}

export function connectFaye() {
    let subscription = store.getState().faye.subscription;
    if (!subscription) {
        subscription = initFaye();
        store.dispatch(setFayeSubscription(subscription));
        return subscription.then(getConversation);
    }

    return subscription;
}

export function disconnectFaye() {
    const subscription = store.getState().faye.subscription;
    if (subscription) {
        subscription.cancel();
        store.dispatch(unsetFayeSubscription());
    }
}
