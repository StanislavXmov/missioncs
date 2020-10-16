import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  id: null,
  name: null,
  coins: 0,
  level: 1,
  harvesters: null,
  collect: 0,
  collectedAll: 0,
  harvestersOnWork: {
    start: null,
    end: null,
    isWorking: false,
    isDone: false
  }
}

const userInit = (state, action) => updateObject(state, {...action.user});
const updateUser = (state, action) => updateObject(state, {...action.user});
const addHarvesting = (state, action) => updateObject(state, {collect: state.collect + action.collected, collectedAll: state.collectedAll + action.collected});
const afterConverted = (state, action) => updateObject(state, {collect: state.collect - action.coins * 100, coins: state.coins + action.coins});
const buyHarvester = (state, action) => {
  const newH = {...state.harvesters};
  if (!newH[action.harvester.name]) {
    newH[action.harvester.name] = action.harvester;
  } else {
    newH[action.harvester.name].amount = newH[action.harvester.name].amount + action.amount;
  }
  
  return updateObject(state, {coins: state.coins - action.price, harvesters: newH});
}

const workStart = (state, action) => updateObject(state, {harvestersOnWork: { ...state.harvestersOnWork, start: action.start, end: action.end, isWorking: true}});
const workEnd = (state) => updateObject(state, {harvestersOnWork: { ...state.harvestersOnWork, start: null, end: null, isWorking: false, isDone: true}});
const workDone = (state) => updateObject(state, {harvestersOnWork: { ...state.harvestersOnWork, isDone: false}});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_INIT: return userInit(state, action);
    case actionType.UPDATE_USER: return updateUser(state, action);
    case actionType.ADD_HARVESTING: return addHarvesting(state, action);
    case actionType.AFTER_CONVERTED: return afterConverted(state, action);
    case actionType.ADD_HARVESTER: return buyHarvester(state, action);
    case actionType.WORK_START: return workStart(state, action);
    case actionType.WORK_END: return workEnd(state);
    case actionType.WORK_DONE: return workDone(state);
    default: return state;
  }
}

export default reducer;
