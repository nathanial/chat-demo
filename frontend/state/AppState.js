import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import Immutable from 'immutable';
import * as actions from './actions';

const defaultState = Immutable.fromJS({selectedTab: 'chat'});

function reducer(state = defaultState, action) {
  switch(action.type) {
    case 'SELECT_TAB':
      return state.set('selectedTab', action.payload);
    case 'INITIAL_STATE':
      return Immutable.fromJS(action.payload);
    default:
      return state;
  }
}

export const appStateStore = createStore(reducer, applyMiddleware(promiseMiddleware));

appStateStore.subscribe(() => {
  localStorage.setItem("appStateStore", JSON.stringify(appStateStore.getState().toJS()));
});

try {
  const storedState = JSON.parse(localStorage.getItem("appStateStore"));
  appStateStore.dispatch(actions.initialState(storedState))
} catch(ex) {
  appStateStore.dispatch(actions.initialState(defaultState));
}
