import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

//Reducers
import authReducer from './store/reducers/authReducer';
import userReducer from "./store/reducers/userReducer";
import postsReducer from './store/reducers/postsReducer';
import errorReducer from "./store/reducers/errorReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postsReducer,
  error: errorReducer,
});

//Process represents the global state of the app. (process.env represents the current enviornment)
const devTools = process.env.NODE_ENV === "production"
? applyMiddleware(thunk)
: composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, devTools);
 
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

