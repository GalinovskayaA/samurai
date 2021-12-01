import React, {useEffect} from 'react';
import {useHistory, withRouter} from "react-router-dom"
import s from './App.module.css';
import Nav from "./components/nav/Nav";
import HeaderContainer from "./components/header/HeaderContainer";
import {useDispatch, useSelector} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/AppReducer";
import {StoreStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader";
import {getAuthUserDataTC} from "./redux/AuthReducer";
import Routes from "./Routes";
import GoogleAnalytics from "./GoogleAnalytics";


const App = () => {
    const dispatch = useDispatch()
    const initialized = useSelector<StoreStateType, boolean>(state => state.app.initialized)
    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log("Some error occurred: " + e)
    }

    const history = useHistory();
    const selectedPage = history.location.pathname // запись просмотров

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
        <div className={`full-size col gap-offset row ${s.appWrapper}`}>
            <HeaderContainer/>
            <main className={`row top ${s.main}`}>
                <Nav/>
                <Routes/>
                <GoogleAnalytics selectedPage={selectedPage}/>
            </main>
        </div>
    );
}

export default compose<React.ComponentType>(withRouter)(App);