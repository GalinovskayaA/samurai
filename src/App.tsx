import React from 'react';
import {withRouter} from "react-router-dom"
import classes from './App.module.css';
import Nav from "./components/nav/nav";
import {DialogsPropsType} from "./redux/DialogsReduser";
import {FriendsPropsType} from "./redux/FriendsReduser";
import {ProfilePageType} from "./redux/ProfileReduser";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/AppReduser";
import {StoreStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader";
import {getAuthUserData} from "./redux/AuthReduser";
import Routes from "./Routes";


export type MapStateToPropsType = {
    initialized: boolean
    profilePage: ProfilePageType
    dialogPage: DialogsPropsType
    friendPage: FriendsPropsType
}
type MapDispatchToPropsType = {
    initializeApp: () => void
    getAuthUserData: () => void

}
type AppType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<AppType> {
    componentDidMount() {
        this.props.initializeApp();
        this.props.getAuthUserData();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className={classes.appWrapper}>
                <HeaderContainer/>
                <Nav friendsProps={this.props.friendPage}/>
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
    connect(mapStateToProps, {initializeApp, getAuthUserData}))(App);