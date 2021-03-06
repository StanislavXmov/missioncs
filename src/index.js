import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import messagesReducer from './store/reducers/message';
import userReducer from './store/reducers/user';


const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const rootReduces = combineReducers({
  auth: authReducer,
  messages: messagesReducer,
  user: userReducer
});
const store = createStore(rootReduces, composeEnhancers(applyMiddleware(thunk)));

const app = <Provider store={store} >
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
