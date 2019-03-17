import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './App';
import { appStateStore } from './state/AppState';

function render(){
  ReactDOM.render(<App appState={appStateStore.getState()} />, document.getElementById("app"));
}

appStateStore.subscribe(() => {
  render();
});

render()

