import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom"
import classes from './App.module.css';
import Nav from "./components/nav/Nav";
import HeaderContainer from "./components/header/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/AppReducer";
import {StoreStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader";
import {getAuthUserDataTC} from "./redux/AuthReducer";
import Routes from "./Routes";


const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<StoreStateType, boolean>(state => state.app.initialized)
    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log("Some error occurred: " + e)
    }
    useEffect(() => {
        dispatch(initializeAppTC())
        dispatch(getAuthUserDataTC())
        window.addEventListener("unhandledrejection", catchAllUnhandledErrors)
        window.removeEventListener("unhandledrejection", catchAllUnhandledErrors)
    })

    if (!initialized) {
        return <Preloader/>
    }
    return (
        <div className={classes.appWrapper}>
            <HeaderContainer/>
            <Nav/>
            <Routes/>
        </div>
    );
}

export default compose<React.ComponentType>(withRouter)(App);