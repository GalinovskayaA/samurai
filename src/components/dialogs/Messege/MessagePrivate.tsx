import React, {useState} from "react"
import s from "./../Messege/Messages.module.css"
import Avatar from "../../common/Avatar"
import {
    getFriendMessagesTC,
    MessageDataType,
    messageDeleteTC,
    messageIsSpamTC,
} from "../../../redux/DialogsReducer"
import {PhotoUsersType} from "../../../redux/UsersReducer"
import deleteScr from './../../../image/deleteSrc.png'
import spamScr from './../../../image/spamSrc.png'
import {useDispatch} from "react-redux"
import {ModalQuestion} from "../../common/modals/ModalQuestion"


type PropsType = {
    messageData: MessageDataType
    photos?: PhotoUsersType
    userId?: string
    myPhoto?: string
}

const MessagePrivate = React.memo(({messageData, photos, userId, myPhoto}: PropsType) => {
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState<boolean>(false)
    const messageStyle = userId && +userId === messageData.recipientId ? s.recipient : s.sender
    const withPhoto = userId && +userId === messageData.recipientId ? myPhoto : photos && photos.small
console.log(messageData)

    const onMessageSpam = () => {
        dispatch(messageIsSpamTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }
    const onMessageDelete = () => {
        dispatch(messageDeleteTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }

    return (
        <div className={s.content}>
            <div className={`${s.message} ${messageStyle}`}>
                {photos && <div>
                    {<img src={withPhoto} alt={''} width={50}/> ?
                        <img src={withPhoto} alt={''} width={50}/> : <Avatar width={50}/>}
                </div>}
                <div>
                    {messageData.deletedByRecipient ?
                        <span> {'Deleted by companion'} </span> : messageData.deletedBySender ?
                            <span> {'Deleted by you'} </span> :
                            <div>
                                <div> {messageData.body} </div>
                                <div> {messageData.addedAt} </div>
                                {/* TODO: сделать красивую дату */}
                                <div className={s.bold}> {!messageData.viewed && 'Message not viewed'} </div>
                                <div>
                                    {userId && +userId === messageData.recipientId ?
                                        <button onClick={() => setModalActive(true)} className={s.button}><img
                                            src={deleteScr} alt={'delete'} width={35} height={35}/></button> :
                                        <button onClick={() => setModalActive(true)} className={s.button}><img
                                            src={spamScr} alt={'spam'} width={35} height={35}/></button>}
                                </div>
                            </div>}
                </div>
                <ModalQuestion title={'Are you sure?'} active={modalActive} setActive={setModalActive}
                               onButtonModal={onMessageSpam}/>
                <ModalQuestion title={'Are you sure?'} active={modalActive} setActive={setModalActive}
                               onButtonModal={onMessageDelete}/>
            </div>
        </div>
    )
})

export default MessagePrivate