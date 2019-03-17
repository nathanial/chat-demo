import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import Immutable from 'immutable';
import * as actions from './actions';

const defaultState = Immutable.fromJS({selectedTab: 'chat', chatHistory: []});

function reducer(state = defaultState, action) {
  switch(action.type) {
    case 'SELECT_TAB':
      return state.set('selectedTab', action.payload);
    case 'INITIAL_STATE':
      return action.payload;
    case 'SEND_CHAT_MESSAGE':
      return state.updateIn(['chatHistory'], list => list.push(Immutable.fromJS({source: 'USER', message: action.payload})));
    default:
      return state;
  }
}

export const appStateStore = createStore(reducer, applyMiddleware(promiseMiddleware));

appStateStore.subscribe(() => {
  localStorage.setItem("appStateStore", JSON.stringify(appStateStore.getState().toJS()));
});

try {
  const storedState = defaultState.merge(Immutable.fromJS(JSON.parse(localStorage.getItem("appStateStore"))));
  appStateStore.dispatch(actions.initialState(storedState))
} catch(ex) {
  appStateStore.dispatch(actions.initialState(defaultState));
}
