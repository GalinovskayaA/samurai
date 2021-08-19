import React from "react";
import classes from "./../Dialogs.module.css"
import Avatar from "../../common/avatar";
import {ChatMessageType} from "../../../api/chat-api";


const Message = ({message, photo, userId, userName}: ChatMessageType) => {
    return <>
        <div style={{fontWeight: "bold"}}>{userName}</div>
        {photo ? <img src={photo} style={{width: "5em"}} alt={''}/> : <Avatar width={80}/>}
        <div className={classes.message}>{message}</div>
    </>
}

export default Message