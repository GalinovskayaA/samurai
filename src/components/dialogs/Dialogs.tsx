import React from "react";
import s from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogsItem";
import DialogsMessages from "./DialogsElements";
import {DialogsContainerPropsType} from "./DialogsContainer";


const Dialogs = (props: DialogsContainerPropsType) => {

    const dialogsElements = props.dialogsData.map((d) => (<DialogItem key={d.id} id={d.id} name={d.name}/>))

    return (
        <div className={s.dialogsContent}>
            <div className={s.dialogItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <DialogsMessages messageData={props.messageData}
                                 dialogsData={props.dialogsData}
                                 addSendMessageClick={props.addSendMessageClick}/>
            </div>
        </div>
    )
}

export default Dialogs;