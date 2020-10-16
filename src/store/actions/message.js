import * as actionType from './actionTypes';
import Axios from 'axios';

export const messageLoad = (messages) => {
  return {
    type: actionType.MESSAGE_LOAD,
    messages
  };
};
export const messageReaded = (messageId) => {
  return {
    type: actionType.MESSAGE_READED,
    messageId
  };
};

export const fetchMessage = () => {
  return dispatch => {

    Axios.get('SERVER.com/message.json')
      .then(res => {
        const fetchedMessage = [];
        for (const key in res.data) {
          fetchedMessage.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(messageLoad(fetchedMessage));
      })
      .catch(e => {
        console.log(e);
      });
  }
}




export const sendMessageOnDB = () => {
  return dispatch => {
    const message = {
      home: {
        m: ['Now we save our space', ' Are you ready?'],
        a: 'astro1',
        screen: 'home',
      }
    }
    Axios.post('SERVER.com/message.json', message)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}


