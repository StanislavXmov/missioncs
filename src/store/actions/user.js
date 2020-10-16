import * as actionType from './actionTypes';
import Axios from 'axios';

export const userInit = (user) => {
  return {
    type: actionType.USER_INIT,
    user
  }
}


export const getUsers = (userId) => {
  return dispatch => {

    Axios.get(`SERVER.com/users/${userId}.json`)
      .then(res => {
        let user;
        for (const key in res.data) {
           user = {
            ...res.data[key],
            idDB: key
          };
        }
        dispatch(userInit(user));
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export const updateHarvesting = (collected) => {
  return {
    type: actionType.ADD_HARVESTING,
    collected
  }
}
export const addHarvesting = (collected) => {
  return (dispatch, getState) => {
    dispatch(updateHarvesting(collected));
    const user = getState().user;
    const token = getState().auth.token;
    Axios.patch(`SERVER.com/users/${user.id}/${user.idDB}.json?auth=` + token, user)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
export const afterConverted = (coins) => {
  return {
    type: actionType.AFTER_CONVERTED,
    coins
  }
}
export const convertHarvesting = (coins) => {
  return (dispatch, getState) => {
    dispatch(afterConverted(coins));
    const user = getState().user;
    const token = getState().auth.token;
    Axios.patch(`SERVER.com/users/${user.id}/${user.idDB}.json?auth=` + token, user)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}

export const buyHarvester = (harvester, price, amount) => {
  return {
    type: actionType.ADD_HARVESTER,
    harvester,
    price,
    amount
  }
}
export const addHarvester = (harvester, price, amount) => {
  return (dispatch, getState) => {
    dispatch(buyHarvester(harvester, price, amount));
    const user = getState().user;
    const token = getState().auth.token;
    Axios.patch(`SERVER.com/users/${user.id}/${user.idDB}.json?auth=` + token, user)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
export const workStart = (start, end) => {
  return {
    type: actionType.WORK_START,
    start,
    end
  }
}
export const start = (start, end) => {
  return (dispatch, getState) => {
    dispatch(workStart(start, end));
    const user = getState().user;
    const token = getState().auth.token;
    Axios.patch(`SERVER.com/users/${user.id}/${user.idDB}.json?auth=` + token, user)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}
export const workEnd = () => {
  return {
    type: actionType.WORK_END,
  }
}
export const workDone = () => {
  return {
    type: actionType.WORK_DONE,
  }
}
export const end = () => {
  return (dispatch, getState) => {
    dispatch(workEnd());
    const user = getState().user;
    const token = getState().auth.token;
    Axios.patch(`SERVER.com/users/${user.id}/${user.idDB}.json?auth=` + token, user)
      .then(res => {
        // console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
}



