import React, {useState} from "react"
import s from ".//Messages.module.css"
import Avatar from "../../common/Avatar"
import {
    getFriendMessagesTC, isNoMessageAC,
    MessageDataType,
    messageDeleteTC,
    messageIsSpamTC,
} from "../../../redux/DialogsReducer"
import {PhotoUsersType} from "../../../redux/UsersReducer"
//import deleteScr from './../../../image/deleteSrc.png' / TODO: вернуть картинки
//import spamScr from './../../../image/spamSrc.png' / TODO: вернуть картинки
import {useDispatch} from "react-redux"
import {ModalQuestion} from "../../common/modals/ModalQuestion"
import {DateTime} from 'luxon';


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
    const data = DateTime.fromISO(messageData.addedAt)


    const onMessageSpam = () => {
        dispatch(messageIsSpamTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
        dispatch(isNoMessageAC(false))
    }
    const onMessageDelete = () => {
        dispatch(messageDeleteTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
        dispatch(isNoMessageAC(false))
    }

    return (
        <div className={s.content}>
            <div className={`${s.message} ${messageStyle}`}>
                {photos && <div>
                    {<img src={withPhoto} alt={''} width={50} className={`img-circle`}/> ?
                        <img src={withPhoto} alt={''} width={50} className={`img-circle`}/> : <Avatar/>}
                </div>}

                    {messageData.deletedByRecipient ?
                        <span> {'Deleted by companion'} </span> : messageData.deletedBySender ?
                            <span> {'Deleted by you'} </span> :
                            <>
                                <div className={`${s.messageBody}`}> {messageData.body} </div>
                                <div> {data.setLocale('ru').toFormat('dd LLL yyyy HH:mm ')} </div>
                                <div className={s.bold}> {!messageData.viewed && 'Message not viewed'} </div>
                                <div>
                                    {userId && +userId === messageData.recipientId ?
                                        <button onClick={() => setModalActive(true)} className={s.button}>{/*<img
                                            src={deleteScr} alt={'delete'}/>*/} del </button> :
                                        <button onClick={() => setModalActive(true)} className={s.button}>{/*<img
                                            src={spamScr} alt={'spam'}/>*/} spam </button>}
                                </div>
                            </>}

                <ModalQuestion title={'Are you sure?'} active={modalActive} setActive={setModalActive}
                               onButtonModal={onMessageSpam}/>
                <ModalQuestion title={'Are you sure?'} active={modalActive} setActive={setModalActive}
                               onButtonModal={onMessageDelete}/>
            </div>
        </div>
    )
})

export default MessagePrivate