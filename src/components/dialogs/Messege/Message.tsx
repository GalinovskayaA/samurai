import React from "react";
import classes from "./../Dialogs.module.css"

export type MessageDataType = {
  id: string,
  message: string
}

const Message = (props: MessageDataType) => {
  return <div className={classes.message}>{props.message}</div>
}

export default Message;