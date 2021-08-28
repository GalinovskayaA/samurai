import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFriendMessagesTC, MessageDataType, sendFriendMessageTC, startDialogsTC} from "../../redux/DialogsReducer";
import {AddMessageForm} from "../chat/AddMessageForm";
import {StoreStateType} from "../../redux/redux-store";
import MessagePrivate from "./Messege/MessagePrivate";
import {getUsersTC, PhotoUsersType, UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import Avatar from "../common/avatar";
import {FriendNewMessageType} from "./MessagesPage";

type DialogsMessagesType = {
    userId: string,
    friendsAll: FriendNewMessageType[]
}
export const DialogsMessages = ({userId, friendsAll}: DialogsMessagesType) => {
    const dispatch = useDispatch()
    const messageData = useSelector<StoreStateType, Array<MessageDataType>>(state => state.dialogPage.messageData)
    const users = useSelector<StoreStateType, Array<UsersType>>(state => state.usersPage.users)
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
        dispatch(startDialogsTC(Number(userId))) // получаем messageData
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }, [dispatch, userId])


    const itIsCompanion = friendsAll.filter(p => String(p.id) === userId)
    console.log(itIsCompanion)

    const addNewMessage = (message: string) => {
        dispatch(sendFriendMessageTC(Number(userId), message))
    }
    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [isAutoScroll, messageData])
    /*const messageElements = props.messageData.map((m) => (<Message key={m.id} userId={m.id} message={m.message} userName={''} photo={''}/>))*/

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
                            {messageData && messageData.map(m => <div style={{display: 'flex'}}>
                                <MessagePrivate messageData={m} key={m.id} photos={itIsCompanion[0].photos}
                                                userId={userId}/></div>)}
    <div ref={messageAnchorRef}> </div>

</div>
                </div>
            </div>
            <AddMessageForm sendMessageForm={addNewMessage} status={'ready'}/>
            {/*<AddMessageReduxForm onSubmit={addNewMessage}/>
            <Emoji chosenEmoji={chosenEmoji} onEmojiClick={onEmojiClick}/>*/}
            {/*<div> {messageElements} </div>*/}
        </div>
    )
}