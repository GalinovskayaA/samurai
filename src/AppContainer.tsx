import React from 'react';
import {Provider} from "react-redux";
import App from "./App";
import store from "./redux/redux-store";
import {HashRouter} from "react-router-dom";


const SamuraiAppContainer = () => {
  return <HashRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </HashRouter>
}

export default SamuraiAppContainer;
