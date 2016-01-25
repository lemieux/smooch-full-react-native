import { store } from '../stores/app-store';
import { addMessage } from '../actions/conversation-actions';
import { updateReadTimestamp, getReadTimestamp } from '../services/conversation-service';

export function initFaye() {
    return Promise.resolve();
}
