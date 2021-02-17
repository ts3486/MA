import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension";
import authReducer from './store/reducers/authReducer';
import userReducer from "./store/reducers/userReducer";
import postsReducer from './store/reducers/postsReducer';
import errorReducer from "./store/reducers/errorReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
  error: errorReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
 
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

