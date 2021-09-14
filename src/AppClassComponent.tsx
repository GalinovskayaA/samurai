import React from 'react';
import {withRouter} from "react-router-dom"
import classes from './App.module.css';
import Nav from "./components/nav/Nav";
import {DialogsType} from "./redux/DialogsReducer";
import {FriendsPropsType} from "./redux/FriendsReducer";
import {ProfilePageType} from "./redux/ProfileReducer";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeAppTC} from "./redux/AppReducer";
import {StoreStateType} from "./redux/redux-store";
import Preloader from "./components/common/Preloader";
import {getAuthUserDataTC} from "./redux/AuthReducer";
import Routes from "./Routes";


export type MapStateToPropsType = {
    initialized: boolean
    profilePage: ProfilePageType
    dialogPage: DialogsType
    friendPage: FriendsPropsType
}
type MapDispatchToPropsType = {
    initializeApp: () => void
    getAuthUserData: () => void

}
type AppType = MapStateToPropsType & MapDispatchToPropsType

class AppClassComponent extends React.Component<AppType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log("Some error occurred: " + e)
    }
    componentDidMount() {
        this.props.initializeApp();
        this.props.getAuthUserData();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }
    componentWillMount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
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
}

const mapStateToProps = (state: StoreStateType): MapStateToPropsType => {
    return {
        initialized: state.app.initialized,
        profilePage: state.profilePage,
        dialogPage: state.dialogPage,
        friendPage: state.friendPage
    }
}

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp: initializeAppTC, getAuthUserData: getAuthUserDataTC}))(AppClassComponent);