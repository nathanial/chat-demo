import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import 'graphiql/graphiql.css'
import {pure} from 'recompose';
import {AppBar, Tabs, Tab, Toolbar, Typography} from '@material-ui/core'
import * as actions from './state/actions';
import {ChatView} from './components/ChatView';

import {appStateStore} from './state/AppState';

function graphQLFetcher(graphQLParams) {
  return fetch('http://localhost:4000/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

function gotoChat(){
  appStateStore.dispatch(actions.selectTab('chat'));
}

function gotoGraphQL(){
  appStateStore.dispatch(actions.selectTab('graphiql'));
}

export const App = pure(({appState}) => {
  const index = ['chat', 'graphiql'].indexOf(appState.get('selectedTab'));
  let tabContent;
  if(index === 0){
    tabContent = <ChatView chatHistory={appState.get('chatHistory')} />;
  } else if(index === 1){
    tabContent = <GraphiQL fetcher={graphQLFetcher} />;
  } else {
    throw new Exception("Unknown Index");
  }

  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        <Typography variant="title" style={{color: 'white'}}>
          Chat Demo
        </Typography>
        <Tabs value={index}>
          <Tab label="Chat" onClick={gotoChat} />
          <Tab label="GraphiQL" onClick={gotoGraphQL} />
        </Tabs>
      </AppBar>
      {tabContent}
    </div>
  )
});