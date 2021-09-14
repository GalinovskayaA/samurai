import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriendMessagesTC, MessageDataType, sendFriendMessageTC} from "../../../redux/DialogsReducer";
import {AddMessageForm} from "../../chat/AddMessageForm";
import {StoreStateType} from "../../../redux/redux-store";
import MessagePrivate from "./MessagePrivate";
import {NavLink} from "react-router-dom";
import Avatar from "../../common/Avatar";
import {FriendNewMessageType} from "./MessagesPage";
import {getUserProfileTC, ProfileType} from "../../../redux/ProfileReducer";

type DialogsMessagesType = {
    userId: string,
    friendsAll: FriendNewMessageType[]
}
export const DialogsMessages = React.memo(({userId, friendsAll}: DialogsMessagesType) => {
    const dispatch = useDispatch()
    const messageData = useSelector<StoreStateType, Array<MessageDataType>>(state => state.dialogPage.messageData)
    const id = useSelector<StoreStateType, number>(state => state.auth.id)
    const profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight < 20) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
        dispatch(getUserProfileTC(String(id)))
    }, [dispatch, userId, id])

    const itIsCompanion = friendsAll.filter(p => String(p.id) === userId)

    const addNewMessage = (message: string) => {
        dispatch(sendFriendMessageTC(Number(userId), message))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }
    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [isAutoScroll, messageData])


    return (
        <div>
            <div style={{border: '.5px solid rgba(0,0,0,.1)', boxShadow: 'inset -5px -5px 10px rgba(0,0,0,.5)'}}>
                <div style={{height: '500px'}}>
                    <NavLink to={'/profile/' + userId}>
                        {itIsCompanion ?
                            <img src={itIsCompanion[0].photos.small} style={{width: "2em", borderRadius: '50%'}}
                                 alt={''}/> : <Avatar width={20}/>}
                        {<span style={{fontWeight: "bold", textDecoration: 'none', lineHeight: 'center'}}>{itIsCompanion[0].name}</span>}
                    </NavLink>

<div style={{height: '28em', overflowY: 'auto'}}  onScroll={scrollHandler}>
                            {messageData && messageData.map((m, index) => <div style={{display: 'flex'}}>
                                <MessagePrivate messageData={m} key={index} photos={itIsCompanion[0].photos}
                                                userId={userId} myPhoto={profile.photos.large}/></div>)}
    <div ref={messageAnchorRef}> </div>

</div>
                </div>
            </div>
            <AddMessageForm sendMessageForm={addNewMessage} status={'ready'} showEmoji={false}/>
        </div>
    )
})