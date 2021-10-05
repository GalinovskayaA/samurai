import React from "react";
import s from "../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import email from './../../../image/email3.png'
import {FriendDialogsType} from "../../../redux/DialogsReducer";
import Avatar from "../../common/Avatar";


type PropsType = {
    user: FriendDialogsType
    page: number
    count: number
    navLink?: string
    startDialog: (userID: string, page: number, count: number) => void
}

const ActionDialogs = (
    {
        user, startDialog,
        page, count, navLink
    }: PropsType
) => {

    return <>
        <div>
            <div> {user.userName} </div>
            <NavLink to={navLink + String(user.id)}>
                {user.photos.small ? <img src={user.photos.small} alt={''} width={75}/> : user.photos.big ?
                    <img src={user.photos.big} alt={''} width={75}/> : <Avatar />}
            </NavLink>
        </div>
        <div>
            <NavLink to={navLink + String(user.id)} className={s.navLink}>
                <button onClick={() => startDialog(String(user.id), page, count)}> To write message</button>
                {user.hasNewMessages &&
                <span>
                   <img src={email} alt={''} height={25}/>
                   <span className={s.newMessagesCount}> {user.newMessagesCount} </span>
                </span>}
            </NavLink>
        </div>
    </>
}

export default ActionDialogs;