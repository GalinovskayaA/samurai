import React from 'react';
import {Route, withRouter} from "react-router-dom"
import classes from './App.module.css';
import Login from "./components/login/Login";
import Nav from "./components/nav/nav";
import ProfileContainer from "./components/profile/ProfileContainer";
import {DialogsPropsType} from "./redux/DialogsReduser";
import {FriendsPropsType} from "./redux/FriendsReduser";
import UsersContainer from "./components/users/UsersContainer";
import {ProfilePageType} from "./redux/ProfileReduser";
import HeaderContainer from "./components/header/HeaderContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/AppReduser";
import {StoreStateType} from "./redux/redux-store";
import Preloader from "./components/common/preloader";
import {getAuthUserData} from "./redux/AuthReduser";
import {withSuspense} from "./Hoc/withSuspense";
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/news/News'));
const Music = React.lazy(() => import('./components/music/Music'));
const Setting = React.lazy(() => import('./components/setting/Setting'));


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
    if (!this.props.initialized) { return <Preloader/>}

    return (
        <div className={classes.appWrapper}>
          <HeaderContainer/>
          <Nav friendsProps={this.props.friendPage}/>
          <div className={classes.appWrapperContent}>
            <div>
              <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
              <Route path='/login' render={() => <Login/>}/>
              <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
              <Route path='/news' render={withSuspense(News)}/>
              <Route path='/music' render={withSuspense(Music)}/>
              <Route path='/setting' render={withSuspense(Setting)}/>
              <Route path='/users' render={() => <UsersContainer/>}/>
            </div>
            <div className={classes.appFriends}>

            </div>
          </div>
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