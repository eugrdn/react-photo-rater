import { createStore } from 'redux';
import { state } from './containers';

const store = createStore(state);

export default store;