import React from "react";
import Message from "./Messege/Message";
import {DialogsContainerPropsType} from "./DialogsContainer";
import {TextareaFormType} from "../profile/MyPosts/MyPosts";
import {AddMessageReduxForm} from "../profile/MyPosts/Post/Textarea";


const DialogsMessages = (props: DialogsContainerPropsType) => {

    const addNewMessage = (values: TextareaFormType) => {
        props.addSendMessageClick(values.textarea)
        values.textarea = ''
    }

    const messageElements = props.messageData.map((m) => (<Message key={m.id} id={m.id} message={m.message}/>))

    return (
        <div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
            <div> {messageElements} </div>
        </div>
    )
}

export default DialogsMessages;