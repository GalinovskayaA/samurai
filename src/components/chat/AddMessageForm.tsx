import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IEmojiData} from 'emoji-picker-react';
import {StatusChatType} from "../../api/chat-api";
import {ModalInfo} from "../common/modals/ModalInfo";
import {Emoji} from "../common/Emoji";

type AddMessageFormType = {
    sendMessageForm: (message: string) => void
    status?: StatusChatType
    userId?: string
    showEmoji: boolean
}

export const AddMessageForm = React.memo(({sendMessageForm, status, userId, showEmoji}: AddMessageFormType) => {

    const [message, setMessage] = useState<string>('')
    const [img, setImage] = useState<string>()
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    const [modalActive, setModalActive] = useState<boolean>(false);
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
    const onFileSelected = (e: React.SyntheticEvent<EventTarget>) => {
        const formInput = (e.target as HTMLFormElement).files;
        if (formInput.length) {
            fr.readAsDataURL(formInput[0]);
        }
    }

    return <>
        <div style={{marginTop: '20px'}}>
            <textarea onChange={onChange} onKeyPress={onKeyPressHandler} value={message}> </textarea>
        </div>
        <input multiple type='file' onChange={onFileSelected}/>
        <img src={img} alt=''/>
        <div>
            <button onClick={sendMessage} disabled={status !== 'ready'}>Send</button>
        </div>
        {showEmoji && <Emoji chosenEmoji={chosenEmoji} onEmojiClick={onEmojiClick}/>}
        <ModalInfo title={'Отправка файлов не реализовано'} active={modalActive} setActive={setModalActive}/>
    </>
})