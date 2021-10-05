import React from "react";
import s from "./chat.module.css"
import Avatar from "../common/Avatar";
import {ChatMessageAPIType} from "../../api/chat-api";
import { NavLink } from "react-router-dom";


const MessageChat = React.memo(({message, photo, userId, userName}: ChatMessageAPIType) => {
    return <div className={`padding-s-tb border-b`}>
        <NavLink to={'/profile/' + userId}>
            <div className={s.userNameChat}>{userName}</div>
            {photo ? <img src={photo} className={`img-circle`} alt={''}/> : <Avatar/>}
        </NavLink>
        <div className={s.message}>{message}</div>
    </div>
})

export default MessageChat