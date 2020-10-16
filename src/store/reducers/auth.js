import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  name: null,
  token: null,
  userId: null,
  error: null,
  loading: true,
  idDB: null
}

const authStart = (state) => updateObject(state, {error: null, loading: true});
const userStart = (state) => updateObject(state, {loadUser: true});
const authSuccess = (state, action) => updateObject(state, {
  name: action.name,
  token: action.token,
  userId: action.userId,
  error: null,
  loading:false,
  idDB: action.idDB || null
});
const authFail = (state, action) => updateObject(state, {error: action.error, loading:false});
const authLogout = (state) => updateObject(state, {name: null, token: null, userId: null, loading: false});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START: return authStart(state);
    case actionType.USER_START: return userStart(state);
    case actionType.AUTH_SUCCESS: return authSuccess(state, action);
    case actionType.AUTH_FAIL: return authFail(state, action);
    case actionType.AUTH_LOGOUT: return authLogout(state);
    default: return state;
  }
}

export default reducer;
