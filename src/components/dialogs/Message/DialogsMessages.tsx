import React, {useEffect, useRef, useState} from "react";
import s from "../Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getFriendMessagesTC,
    MessageDataType,
    sendFriendMessageTC
} from "../../../redux/DialogsReducer";
import {AddMessageForm} from "../../chat/AddMessageForm";
import MessagePrivate from "./MessagePrivate";
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar";
import {FriendNewMessageType} from "./MessagesPage";
import {ProfileType} from "../../../redux/ProfileReducer";
import {StoreStateType} from "../../../redux/redux-store";

type DialogsMessagesType = {
    userId: string,
    friendsAll: FriendNewMessageType[],
    messageData: MessageDataType[],
    profile: ProfileType
}
export const DialogsMessages = React.memo(({userId, friendsAll, profile, messageData}: DialogsMessagesType) => {
    const dispatch = useDispatch()
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const {isLoadingMessage, isNoMessage} = useSelector((state: StoreStateType) => state.dialogPage)
    const [page, setPage] = useState<number>(2)
    const [isScrollUp, setIsScrollUp] = useState<boolean>(false)
    const [currentMessageData, setCurrentMessageData] = useState<MessageDataType[]>([...messageData])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (!isNoMessage && messageData.length > 0 && element.scrollTop === 0) {
            setPage(page + 1)
            if (messageAnchorRef.current) {
                messageAnchorRef.current.scrollBy({
                    behavior: 'smooth',
                    top: messageAnchorRef.current.scrollHeight / (page - 1)
                })
                setIsScrollUp(true)
            }
            dispatch(getFriendMessagesTC(Number(userId), page, 20, currentMessageData))
        }
    }

    useEffect(() => {
        setCurrentMessageData(messageData)
    }, [messageData])

    useEffect(() => {
        if (isNoMessage && messageAnchorRef.current) {
            messageAnchorRef.current.scrollTop = 0
        }
    }, [isNoMessage])

    useEffect(() => {
        !isScrollUp && setTimeout(() => {
            if (messageAnchorRef.current) {
                messageAnchorRef.current.scrollBy({behavior: 'smooth', top: messageAnchorRef.current.scrollHeight})
            }
        }, 0)
    }, [isScrollUp, messageData])

    const itIsCompanion = friendsAll.filter(p => String(p.id) === userId)

    const addNewMessage = (message: string) => {
        dispatch(sendFriendMessageTC(Number(userId), message))
    }

    return (
        <>
            <div className={s.dialogWindow}>
                <NavLink to={'/profile/' + userId}>
                    {<h2 className={s.companionName}>{itIsCompanion[0].name}</h2>}
                    {itIsCompanion ?
                        <img src={itIsCompanion[0].photos.small} className={`img-circle`}
                             alt={''}/> : <Avatar/>}

                </NavLink>

                <div className={s.dialogScrollbar} onScroll={scrollHandler} ref={messageAnchorRef}>
                    {!isNoMessage && currentMessageData.length > 19 && <div className={s.messagesHistory}>
                        {'Предыдущие сообщения'}
                    </div>}
                    {isNoMessage && <div className={s.messagesHistory}> {'Больше сообщений нет'}
                    </div>}
                    {profile && currentMessageData && currentMessageData.map((m, index) => <div
                        key={`message-${index}`} className={s.messagePrivateContent}>
                        <MessagePrivate messageData={m} key={index} photos={itIsCompanion[0].photos}
                                        userId={userId} myPhoto={profile?.photos.large}/></div>)}
                    {isLoadingMessage === 'loading' && <div className={s.messagesLoading}> {'Is Loading'}
                    </div>}
                </div>
            </div>
            <AddMessageForm sendMessageForm={addNewMessage} status={'ready'} showEmoji={false}/>
        </>
    )
})