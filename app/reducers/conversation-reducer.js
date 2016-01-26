import { ADD_MESSAGE, MESSAGES_CLEARED, SET_CONVERSATION, RESET_CONVERSATION } from '../actions/conversation-actions';
import { RESET } from '../actions/common-actions';

const INITIAL_STATE = {
    messages: [
        {
            role: 'appUser',
            text: 'hello',
            actions: []
        },

            {
                role: 'appMaker',
                text: 'Hi there! How can I help you?',
                name: 'The Dude',
                avatarUrl: 'https://avatars3.githubusercontent.com/u/781844?v=3&u=0fdd9c8594cea1de7360b7491af7256cbcf74235',
                actions: []
            }
    ]
};

export function ConversationReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case RESET:
        case RESET_CONVERSATION:
            return Object.assign({}, INITIAL_STATE);
        case SET_CONVERSATION:
            return Object.assign({}, action.conversation);
        case ADD_MESSAGE:
            return Object.assign({}, state, {
                messages: [...state.messages, action.message]
            });
        default:
            return state;
    }
}
