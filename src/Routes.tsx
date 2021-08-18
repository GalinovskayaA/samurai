import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import classes from './App.module.css';
import {UsersPageComponent} from "./components/users/UsersContainer";
import {withSuspense} from "./Hoc/withSuspense";
import {Login} from "./components/login/Login";
import {ProfileComponent} from "./components/profile/ProfileComponent";


const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
const ChatPage = React.lazy(() => import('./components/chat/ChatPage'));
const News = React.lazy(() => import('./components/news/News'));
const Music = React.lazy(() => import('./components/music/Music'));
const Setting = React.lazy(() => import('./components/setting/Setting'));
const Friends = React.lazy(() => import('./components/friends/Friends'));

export const PATH = {
    PROFILE: "/profile",
    LOGIN: "/login",
    DIALOGS: "/dialogs",
    CHAT: "/chat",
    NEWS: "/news",
    MUSIC: "/music",
    SETTING: "/setting",
    USERS: "/users",
    FRIENDS: "/friends",
    //  ERROR: "/error404",
}

const Routes = () => {
    return (
        <div className={classes.appWrapperContent}>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE + '/:userId?'} render={() => <ProfileComponent/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.DIALOGS} render={withSuspense(DialogsContainer)}/>
                <Route path={PATH.CHAT} render={withSuspense(ChatPage)}/>
                <Route path={PATH.NEWS} render={withSuspense(News)}/>
                <Route path={PATH.MUSIC} render={withSuspense(Music)}/>
                <Route path={PATH.SETTING} render={withSuspense(Setting)}/>
                <Route path={PATH.USERS} render={() => <UsersPageComponent/>}/>
                <Route path={PATH.FRIENDS} render={withSuspense(Friends)}/>
                <Route path={'*'} render={() => <div> Error 404 </div>}/>
            </Switch>
        </div>
    )
}

export default Routes;