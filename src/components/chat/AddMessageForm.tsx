import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';
import {StatusChatType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import {sendMessagesTC} from "../../redux/ChatReducer";
import {ModalInfo} from "../common/Modals/ModalInfo";


export const AddMessageForm: React.FC = () => {
    const status = useSelector<StoreStateType, StatusChatType>(state => state.chat.status)
    const [message, setMessage] = useState<string>('')
    const [img, setImage] = useState<string>()
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const dispatch = useDispatch()
    const fr = new FileReader();
    fr.onload = function(){
        setImage(fr.result as string)
    }

    const sendMessage = () => {
        if (img) {
            setModalActive(true)
        } else if(!message) {
            return
        } else {
            dispatch(sendMessagesTC(message))
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
            console.log(formInput[0])
        }
    }

    return <>
        <div>
            <textarea onChange={onChange} onKeyPress={onKeyPressHandler} value={message}> </textarea>
        </div>
        <input multiple type='file' onChange={onFileSelected}/>
        <img src={img} alt=''/>
        <div>
            <button onClick={sendMessage} disabled={status !== 'ready'}>Send</button>
        </div>

        <div>
            {chosenEmoji ? (
                <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
                <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} preload={true}/>
        </div>
        <ModalInfo title={'Отправка файлов не реализовано'} active={modalActive} setActive={setModalActive}/>
    </>
}