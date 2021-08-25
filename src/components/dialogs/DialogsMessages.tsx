import React, {useState} from "react";
import {TextareaFormType} from "../profile/MyPosts/MyPosts";
import {AddMessageReduxForm} from "../profile/MyPosts/Post/Textarea";
import {Emoji} from "../common/Emoji";
import {IEmojiData} from "emoji-picker-react";
import {useDispatch} from "react-redux";
import {sendFriendMessageTC} from "../../redux/DialogsReducer";
import {AddMessageForm} from "../chat/AddMessageForm";

type DialogsMessagesType = {
    userId?: string,
}
export const DialogsMessages = ({userId}: DialogsMessagesType) => {
    const dispatch = useDispatch()

    const addNewMessage = (message: string) => {
        dispatch(sendFriendMessageTC(Number(userId), message))
    }

    /*const messageElements = props.messageData.map((m) => (<Message key={m.id} userId={m.id} message={m.message} userName={''} photo={''}/>))*/

    return (
        <div>
            <div style={{border: '.5px solid rgba(0,0,0,.1)', boxShadow: '2px 2px 2px rgba(0,0,0,.5)', height: '500px'}}> </div>
            <AddMessageForm sendMessageForm={addNewMessage} status={'ready'}/>
            {/*<AddMessageReduxForm onSubmit={addNewMessage}/>
            <Emoji chosenEmoji={chosenEmoji} onEmojiClick={onEmojiClick}/>*/}
            {/*<div> {messageElements} </div>*/}
        </div>
    )
}