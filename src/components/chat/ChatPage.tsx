import React, {useEffect, useRef, useState} from 'react';
import MessageChat from "./MessageChat";
import {StatusChatType} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {
    ChatMessageType, sendMessagesTC,
    startMessagesListenerTC,
    stopMessagesListenerTC
} from "../../redux/ChatReducer";
import {StoreStateType} from "../../redux/redux-store";
import {AddMessageForm} from "./AddMessageForm";


const ChatPage: React.FC = () => {
    return <>
        <Chat/>
    </>
}

const Chat: React.FC = () => {
    const status = useSelector<StoreStateType, StatusChatType>(state => state.chat.status)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListenerTC())

        return () => {
            dispatch(stopMessagesListenerTC())
        }
    }, [dispatch])
    const sendMessageForm = (message: string) => {
        dispatch(sendMessagesTC(message))
    }

    return <>
        {status === 'error' && <div> Some error occurred. Please refresh the page </div>}
        <MessagesChat/>
        <AddMessageForm sendMessageForm={sendMessageForm} status={status} showEmoji/>
    </>
}

export const MessagesChat: React.FC = React.memo(() => {
    const messages = useSelector<StoreStateType, ChatMessageType[]>(state => state.chat.messages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight < 200) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [isAutoScroll, messages])

    return <>
        <div style={{height: '25em', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m, index) => <MessageChat key={index} userId={m.userId} message={m.message}
                                              userName={m.userName} photo={m.photo}/>)}
            <div ref={messageAnchorRef}> </div>
        </div>
    </>
})

export default ChatPage