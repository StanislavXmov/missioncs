import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  messages: null,
  readedMessages : []
}


const loadMessages = (state, action) => updateObject(state, {messages: action.messages});
const messageReaded = (state, action) => updateObject(state, {readedMessages: [...state.readedMessages, action.messageId]});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.MESSAGE_LOAD: return loadMessages(state, action);
    case actionType.MESSAGE_READED: return messageReaded(state, action);
    default: return state;
  }
}

export default reducer;
