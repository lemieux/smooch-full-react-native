export const TOGGLE_WIDGET = 'TOGGLE_WIDGET';
export const OPEN_WIDGET = 'OPEN_WIDGET';
export const CLOSE_WIDGET = 'CLOSE_WIDGET';
export const ENABLE_SETTINGS = 'ENABLE_SETTINGS';
export const DISABLE_SETTINGS = 'DISABLE_SETTINGS';
export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const HIDE_SETTINGS = 'HIDE_SETTINGS';
export const SHOW_SETTINGS_NOTIFICATION = 'SHOW_SETTINGS_NOTIFICATION';
export const HIDE_SETTINGS_NOTIFICATION = 'HIDE_SETTINGS_NOTIFICATION';
export const SHOW_ERROR_NOTIFICATION = 'SHOW_ERROR_NOTIFICATION';
export const HIDE_ERROR_NOTIFICATION = 'HIDE_ERROR_NOTIFICATION';
export const SET_SERVER_URL = 'SET_SERVER_URL';
export const SET_EMAIL_READONLY = 'SET_EMAIL_READONLY';
export const UNSET_EMAIL_READONLY = 'UNSET_EMAIL_READONLY';
export const UPDATE_READ_TIMESTAMP = 'UPDATE_READ_TIMESTAMP';

export function toggleWidget() {
    return {
        type: TOGGLE_WIDGET
    };
}

export function openWidget() {
    return {
        type: OPEN_WIDGET
    };
}

export function closeWidget() {
    return {
        type: CLOSE_WIDGET
    };
}

export function showSettings() {
    return {
        type: SHOW_SETTINGS
    };
}

export function hideSettings() {
    return {
        type: HIDE_SETTINGS
    };
}

export function enableSettings() {
    return {
        type: ENABLE_SETTINGS
    };
}

export function disableSettings() {
    return {
        type: DISABLE_SETTINGS
    };
}

export function setEmailReadonly() {
    return {
        type: SET_EMAIL_READONLY
    };
}

export function unsetEmailReadonly() {
    return {
        type: UNSET_EMAIL_READONLY
    };
}

export function showSettingsNotification() {
    return {
        type: SHOW_SETTINGS_NOTIFICATION
    };
}

export function hideSettingsNotification() {
    return {
        type: HIDE_SETTINGS_NOTIFICATION
    };
}

export function setServerURL(url) {
    return {
        type: SET_SERVER_URL,
        url: url
    };
}

export function updateReadTimestamp(timestamp) {
    return {
        type: UPDATE_READ_TIMESTAMP,
        timestamp
    };
}

export function showErrorNotification(message) {
    return {
        type: SHOW_ERROR_NOTIFICATION,
        message
    };
}

export function hideErrorNotification(message) {
    return {
        type: HIDE_ERROR_NOTIFICATION,
        message
    };
}
