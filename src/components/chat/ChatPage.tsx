import React, {useEffect, useState} from 'react';
import Message from "../dialogs/Messege/Message";

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number | string,
    userName: string,
}

const ChatPage: React.FC = () => {
    return <>
        <Chat/>
    </>
}

const Chat: React.FC = () => {
    return <>
        <MessagesChat/>
        <AddMessageForm/>
    </>
}

export const MessagesChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        })
    }, [messages])

    return <>
        <div style={{height: '20em', overflow: 'auto'}}>
            {messages.map((m, index) => <Message key={index} userId={m.userId} message={m.message} userName={m.userName}
                                        photo={m.photo}/>)}
        </div>
    </>
}

export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState<string>('')
    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel.send(message)
        setMessage('')
    }
    return <>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}> </textarea>
        </div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>

    </>
}

export default ChatPage