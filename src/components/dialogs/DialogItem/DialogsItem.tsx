import React from "react";
import classes from "./../Dialogs.module.css"
import {NavLink} from "react-router-dom";

type DialogsItemType = {
    id: string,
    avatar: string,
    name: string,
}

const DialogItem = (props: DialogsItemType) => {
    const Path = "/dialogs/" + props.id // это прописывается в url /dialogs/1-7

    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <img src={props.avatar} alt={''}/>
            <NavLink to={Path}>{props.name}</NavLink>
        </div>
    )
}
// Navlink to - это указание пути
export default DialogItem;