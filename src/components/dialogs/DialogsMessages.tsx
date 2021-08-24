import React from "react";
import {TextareaFormType} from "../profile/MyPosts/MyPosts";
import {AddMessageReduxForm} from "../profile/MyPosts/Post/Textarea";


const DialogsMessages = () => {

    const addNewMessage = (values: TextareaFormType) => {
    //    props.addSendMessageClick(values.textarea)
        values.textarea = ''
    }

    /*const messageElements = props.messageData.map((m) => (<Message key={m.id} userId={m.id} message={m.message} userName={''} photo={''}/>))*/

    return (
        <div>
            <AddMessageReduxForm onSubmit={addNewMessage}/>
            {/*<div> {messageElements} </div>*/}
        </div>
    )
}

export default DialogsMessages;