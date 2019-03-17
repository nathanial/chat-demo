import {createAction} from 'redux-actions';
import * as client from '../client';

export const selectTab = createAction('SELECT_TAB');
export const initialState = createAction('INITIAL_STATE');
export const sayHello = createAction('SAY_HELLO', async () => {
  const result = await client.hello();
  return result.data;
});
export const sendChatMessage = createAction('SEND_CHAT_MESSAGE', (message) => {
  return message;
});