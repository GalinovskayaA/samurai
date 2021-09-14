import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {HashRouter} from "react-router-dom";
import App from "./App";


const SamuraiAppContainer = () => {
    return <HashRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </HashRouter>
}

export default SamuraiAppContainer;
