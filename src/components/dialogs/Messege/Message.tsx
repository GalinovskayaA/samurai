import React from "react";
import classes from "./../Dialogs.module.css"
import {MessageDataType} from "../../../redux/DialogsReducer";


const Message = ({message}: MessageDataType) => {
  return <div className={classes.message}>{message}</div>
}

export default Message;