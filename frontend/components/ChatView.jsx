import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Button} from '@material-ui/core';
import * as actions from '../state/actions';
import {appStateStore} from '../state/AppState';
import "./ChatView.scss";

function sayHello(){
  appStateStore.dispatch(actions.sayHello());
}

function Messages({chatHistory}) {
  return (
    <div className="messages"> 
      {
        chatHistory.map(chatMessage => {
          return <div className="chat-message">{chatMessage.get('message')}</div>
        })
      }
    </div>
  );
}

function NewMessageInput(){
  const [msg, setMsg] = useState('');

  function onKeyDown(event) {
    if(event.keyCode == 13) {
      appStateStore.dispatch(actions.sendChatMessage(msg))
      setMsg('');
    }
  }

  return (
    <div className="new-message-input">
      <input type="text" value={msg} onChange={(event) => setMsg(event.target.value)} onKeyDown={onKeyDown}/>
    </div>
  );
}

export function ChatView({chatHistory}){
  return (
    <div className="chat-view">
      <Messages chatHistory={chatHistory} />
      <NewMessageInput />
    </div>
  )
}