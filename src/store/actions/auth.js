import * as actionType from './actionTypes';
import Axios from 'axios';

const apiKey = 'SecretApiKey';

export const authStart = () => {
  return {
    type: actionType.AUTH_START
  };
};
export const userStart = () => {
  return {
    type: actionType.USER_START,
  };
};
export const authSuccess = (name, token, userId) => {
  return {
    type: actionType.AUTH_SUCCESS,
    name,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('name');
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('idDB');
  return {
    type: actionType.AUTH_LOGOUT
  }
}

export const auth = (name, email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
    if (!isSignup) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }
    Axios.post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('name', name);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(name, res.data.idToken, res.data.localId));
        
        if (isSignup) {
          const user = {
            id: res.data.localId,
            name: name,
            coins: 0,
            level: 1,
            harvesters: [],
            collect: 0,
            collectedAll: 0
          };
          Axios.post(`SERVER.com/users/${res.data.localId}.json?auth=${res.data.idToken}`, user)
          .then(res => {
            dispatch(userStart());
          })
          .catch(e => {
            console.log(e);
          });
        } else {
          dispatch(userStart());
        }
      })
      .catch(e => {
        dispatch(authFail(e.response.data.error));
      });
  }
};


export const authCheckState = () => {
  return dispatch => {
    dispatch(authStart());
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(name, token, userId));
        dispatch(userStart());
      } else {
        dispatch(logout());
      }
    }
  }
}

