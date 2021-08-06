import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";
import {DialogsDataType} from "../../../redux/DialogsReducer";


const DialogItem = (props: DialogsDataType) => {
  const Path = "/dialogs/" + props.id // это прописывается в url /dialogs/1-7

  return (
    <div className={classes.dialog + ' ' + classes.active}>
      <NavLink to={Path}>{props.name}</NavLink>
    </div>
  )
}
// Navlink to - это указание пути
export default DialogItem;