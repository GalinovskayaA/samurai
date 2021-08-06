import React from "react";
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogsItem";
import DialogsMessages from "./DialogsElements";
import {DialogsContainerPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsContainerPropsType) => {

  const dialogsElements = props.dialogsData.map ((d) => (<DialogItem key={d.id} id={d.id} name={d.name}/>))

    return (
      <div className={classes.dialogsContent}>
        <div className={classes.dialogItems}>

          { dialogsElements }

        </div>
        <div className={classes.messages}>
          <div>
            <DialogsMessages messageData={props.messageData} dialogsData={props.dialogsData} addSendMessageClick={props.addSendMessageClick} />
          </div>
        </div>
      </div>
    )
}

export default Dialogs;