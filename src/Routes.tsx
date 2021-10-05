import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom"
import s from './App.module.css';
import {UsersPageComponent} from "./components/users/UsersContainer";
import {withSuspense} from "./hoc/withSuspense";
import {Login} from "./components/login/Login";
import {ProfileComponent} from "./components/profile/ProfileComponent";


const Messages = React.lazy(() => import('./components/dialogs/Message/MessagesPage'));
const ChatPage = React.lazy(() => import('./components/chat/ChatPage'));

export const PATH = {
    PROFILE: "/profile",
    LOGIN: "/login",
    MESSAGES: "/dialogs",
    CHAT: "/chat",
    USERS: "/users",
    //  ERROR: "/error404",
}

const Routes = () => {
    return (
        <div className={s.appWrapperContent}>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.PROFILE}/>}/>
                <Route path={PATH.PROFILE + '/:userId?'} render={() => <ProfileComponent/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.MESSAGES + '/:userId?'} render={withSuspense(Messages)}/>
                <Route path={PATH.CHAT} render={withSuspense(ChatPage)}/>
                <Route path={PATH.USERS} render={() => <UsersPageComponent/>}/>
                <Route path={'*'} render={() => <div> Error 404 </div>}/>
            </Switch>
        </div>
    )
}

export default Routes;