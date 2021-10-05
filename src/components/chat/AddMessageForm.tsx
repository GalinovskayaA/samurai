import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./chat.module.css"
import {IEmojiData} from 'emoji-picker-react';
import {StatusChatType} from "../../api/chat-api";
import {Emoji} from "../common/Emoji";

type AddMessageFormType = {
    sendMessageForm: (message: string) => void
    status?: StatusChatType
    userId?: string
    showEmoji: boolean
}

export const AddMessageForm = React.memo(({sendMessageForm, status, showEmoji}: AddMessageFormType) => {

    const [message, setMessage] = useState<string>('')
    const [img, setImage] = useState<string>()
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    const [, setModalActive] = useState<boolean>(false);
    const fr = new FileReader();
    fr.onload = function () {
        setImage(fr.result as string)
    }

    const sendMessage = () => {
        if (img) {
            setModalActive(true)
        } else if (!message) {
            return
        } else {
            sendMessageForm(message)
            setMessage('')
        }
    }
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            sendMessage()
            setMessage('')
        }
    }
    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        setChosenEmoji(emojiObject);
        setMessage(message + emojiObject.emoji);
    }

    return <div className={s.addMessageContent}>
            <textarea onChange={onChange} onKeyPress={onKeyPressHandler} value={message} className={`${s.textarea}`}> </textarea>
            <button onClick={sendMessage} disabled={status !== 'ready'}>Send</button>
        {showEmoji && <Emoji chosenEmoji={chosenEmoji} onEmojiClick={onEmojiClick}/>}
    </div>
})