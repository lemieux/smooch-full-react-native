import Smooch from 'smooch-core';
import { store } from '../stores/app-store';

function urljoin(...args) {
  return args.map((part) => {
    return part.replace(/\/$/, '');
  }).join('/');
}

export function core() {
    const auth = store.getState().auth;
    return new Smooch(auth, urljoin(store.getState().appState.serverURL, 'v1'));
}
