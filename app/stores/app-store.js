import { createStore } from 'redux';
import { RootReducer } from '../reducers/root-reducer';

const initialState = {};

export const store = createStore(RootReducer, initialState);
