import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';
import {StatusChatType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import {sendMessagesTC} from "../../redux/ChatReducer";
import {setCurrentPageAC} from "../../redux/UsersReducer";


export const AddMessageForm: React.FC = () => {
    const status = useSelector<StoreStateType, StatusChatType>(state => state.chat.status)
    const [message, setMessage] = useState<string>('')
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    const dispatch = useDispatch()

    const sendMessage = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessagesTC(message))
        setMessage('')
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
    };

    return <>
        <div>
            <textarea onChange={onChange} onKeyPress={onKeyPressHandler} value={message}> </textarea>
        </div>
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
    </>
}