import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './mock/mock'
import store from './redux/store';
import { Provider } from 'react-redux';
// import Test from './Test';
const root = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
     <App />
    // {/* <Test></Test> */}
  </Provider>,
  root
);
