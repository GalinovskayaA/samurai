import React from "react";
import classes from "./../Dialogs.module.css"
import {ChatMessageType} from "../../chat/ChatPage";
import Avatar from "../../common/avatar";


const Message = ({message, photo, userId, userName}: ChatMessageType) => {
    return <>
        <div style={{fontWeight: "bold"}}>{userName}</div>
        {photo ? <img src={photo} style={{width: "5em"}} alt={''}/> : <Avatar width={80}/>}
        <div className={classes.message}>{message}</div>
    </>
}

export default Message