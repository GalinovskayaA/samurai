import React, {useEffect, useState} from 'react';
import Picker, {IEmojiData} from 'emoji-picker-react';
import Message from "../dialogs/Messege/Message";
import {ChatMessageType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessagesTC, startMessagesListenerTC, stopMessagesListenerTC} from "../../redux/ChatReducer";
import {StoreStateType} from "../../redux/redux-store";


const ChatPage: React.FC = () => {
    return <>
        <Chat/>
    </>
}

const Chat: React.FC = () => {
//    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListenerTC())
        /*let ws: WebSocket
        const closeHandler = () => {   // пересоздание канала, если он оборвался
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler) // отписываемся от старого
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }*/

        /*createChannel()
        return () => {
            ws.addEventListener('close', closeHandler)
            ws.close()
        }*/
        return () => {
            dispatch(stopMessagesListenerTC())
        }
    }, [dispatch])

    return <>
        <MessagesChat />
{/*        <MessagesChat wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>*/}
        <AddMessageForm />
    </>
}

export const MessagesChat: React.FC/*<{ wsChannel: WebSocket | null }>*/ = (/*{wsChannel}*/) => {
    const messages = useSelector<StoreStateType, ChatMessageType[]>(state => state.chat.messages)

    /*useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])*/

    return <>
        <div style={{height: '20em', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} userId={m.userId} message={m.message}
                                                 userName={m.userName} photo={m.photo}/>)}
        </div>
    </>
}

export const AddMessageForm: React.FC/*<{ wsChannel: WebSocket | null }>*/ = (/*{wsChannel}*/) => {
    const [message, setMessage] = useState<string>('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>();
    const dispatch = useDispatch()

    /*useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])*/

    const sendMessage = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessagesTC(message))
        setMessage('')
    }
    const onEmojiClick = (event: React.MouseEvent, emojiObject: IEmojiData) => {
        setChosenEmoji(emojiObject);
        setMessage(message + emojiObject.emoji);
    };

    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}> </textarea>
        </div>
        <div>
            <button onClick={sendMessage} disabled={false}>Send</button>
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

export default ChatPage