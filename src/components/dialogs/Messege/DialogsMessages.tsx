import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriendMessagesTC, MessageDataType, sendFriendMessageTC} from "../../../redux/DialogsReducer";
import {AddMessageForm} from "../../chat/AddMessageForm";
import {StoreStateType} from "../../../redux/redux-store";
import MessagePrivate from "./MessagePrivate";
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar";
import {FriendNewMessageType} from "./MessagesPage";
import {ProfileType} from "../../../redux/ProfileReducer";

type DialogsMessagesType = {
    userId: string,
    friendsAll: FriendNewMessageType[],
    profile: ProfileType
}
export const DialogsMessages = React.memo(({userId, friendsAll, profile}: DialogsMessagesType) => {
    const dispatch = useDispatch()
    const messageData = useSelector<StoreStateType, Array<MessageDataType>>(state => state.dialogPage.messageData)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [page, setPage] = useState<number>(1)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (element.scrollTop === 0) {
            /*setPage(page + 1)
            dispatch(getFriendMessagesTC(Number(userId), page, 20))*/
            element.scrollTop = element.scrollHeight / 2
        }
        console.log(e)
    }

    useEffect(() => {
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }, [dispatch, userId, page])

    const itIsCompanion = friendsAll.filter(p => String(p.id) === userId)

    const addNewMessage = (message: string) => {
        dispatch(sendFriendMessageTC(Number(userId), message))
    //    dispatch(getFriendMessagesTC(Number(userId), 1, 20))
        messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})

    }
    useEffect(() => {
        if (messageAnchorRef.current) {
            messageAnchorRef.current.scrollTop = messageAnchorRef.current.scrollHeight
        }
    }, [messageData])


    return (
        <div>
            <div style={{border: '.5px solid rgba(0,0,0,.1)', boxShadow: 'inset -5px -5px 10px rgba(0,0,0,.5)'}}>
                <div style={{height: '500px'}}>
                    <NavLink to={'/profile/' + userId}>
                        {itIsCompanion ?
                            <img src={itIsCompanion[0].photos.small} style={{width: "2em", borderRadius: '50%'}}
                                 alt={''}/> : <Avatar width={20}/>}
                        {<span style={{
                            fontWeight: "bold",
                            textDecoration: 'none',
                            lineHeight: 'center'
                        }}>{itIsCompanion[0].name}</span>}
                    </NavLink>

                    <div style={{height: '28em', overflowY: 'auto'}} onScroll={scrollHandler} ref={messageAnchorRef}>
                        {profile && messageData && messageData.map((m, index) => <div style={{display: 'flex'}}>
                            <MessagePrivate messageData={m} key={index} photos={itIsCompanion[0].photos}
                                            userId={userId} myPhoto={profile?.photos.large}/></div>)}
                    </div>
                </div>
            </div>
            <AddMessageForm sendMessageForm={addNewMessage} status={'ready'} showEmoji={false}/>
        </div>
    )
})