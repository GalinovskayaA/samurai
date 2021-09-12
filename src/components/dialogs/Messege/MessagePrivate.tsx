import React, {CSSProperties, useEffect, useState} from "react";
import classes from "./../Dialogs.module.css"
import Avatar from "../../common/avatar";
import {
    getFriendMessagesTC,
    isViewedMessageTC,
    MessageDataType,
    messageDeleteTC,
    messageIsSpamTC,
} from "../../../redux/DialogsReducer";
import {PhotoUsersType} from "../../../redux/UsersReducer";
import mePhoto from './../../../image/smile.png'
import deleteScr from './../../../image/deleteSrc.png'
import spamScr from './../../../image/spamSrc.png'
import {useDispatch} from "react-redux";
import {ModalQuestion} from "../../common/Modals/ModalQuestion";


type PropsType = {
    messageData: MessageDataType
    photos?: PhotoUsersType
    userId?: string
}

const MessagePrivate = React.memo(({messageData, photos, userId}: PropsType) => {
    console.log(messageData)
    console.log('MessagePrivate MessagePrivate MessagePrivate')
    const dispatch = useDispatch()
    const [modalActive, setModalActive] = useState<boolean>(false);
    const messageStyle: CSSProperties = userId && +userId === messageData.recipientId ? {
        backgroundColor: 'rgba(155,5,175,0.3)',
        float: 'right', margin: '5px', padding: '5px', borderRadius: '5px'
    } : {backgroundColor: 'rgba(52,124,245,0.3)', float: 'left', margin: '5px', padding: '5px', borderRadius: '5px'}
    const buttonStyle: CSSProperties = {
        border: '1px solid #fff',
        outline: 'none',
        textDecoration: 'none',
        backgroundColor: 'rgba(255,255,255,.1)',
        borderRadius: '5px'
    }
    const withPhoto = userId && +userId === messageData.recipientId ? mePhoto : photos && photos.small

    useEffect(() => {
        dispatch(isViewedMessageTC(messageData.id))
    }, [])

    const onMessageSpam = () => {
        dispatch(messageIsSpamTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }
    const onMessageDelete = () => {
        dispatch(messageDeleteTC(messageData.id))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))
    }

    return (
        <div style={{width: '100%'}}>
            <div style={messageStyle}>
                {photos && <div>
                    {<img src={withPhoto} alt={''} width={50}/> ?
                        <img src={withPhoto} alt={''} width={50}/> : <Avatar width={50}/>}
                </div>}
                <div>
                    {messageData.deletedByRecipient ?
                        <span> {'Deleted by companion'} </span> : messageData.deletedBySender ?
                            <span> {'Deleted by you'} </span> :
                            <div>
                                <div className={classes.message}> {messageData.body} </div>
                                <div> {messageData.addedAt} </div>
                                <div style={{fontWeight: "bold"}}> {!messageData.viewed && 'Message not viewed'} </div>
                                <div>
                                    {userId && +userId === messageData.recipientId ?
                                        <button onClick={() => setModalActive(true)} style={buttonStyle}><img
                                            src={deleteScr} alt={'delete'} width={35} height={35}/></button> :
                                        <button onClick={() => setModalActive(true)} style={buttonStyle}><img
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