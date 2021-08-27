import React, {CSSProperties} from "react";
import classes from "./../Dialogs.module.css"
import Avatar from "../../common/avatar";
import {MessageDataType} from "../../../redux/DialogsReducer";
import {PhotoUsersType} from "../../../redux/UsersReducer";
import mePhoto from './../../../image/smile.png'


type PropsType = {
    messageData: MessageDataType
    photos?: PhotoUsersType
    userId?: string,
}

const MessagePrivate = React.memo(({messageData, photos, userId}: PropsType) => {
    console.log(messageData)
    //  const photoUser = messageData.senderName ? myPhoto : photos
    const messageStyle: CSSProperties = userId && +userId === messageData.recipientId ? {
        backgroundColor: 'rgba(155,5,175,0.3)',
        float: 'right', margin: '5px', padding: '5px', borderRadius: '5px'
    } : {backgroundColor: 'rgba(52,124,245,0.3)', float: 'left', margin: '5px', padding: '5px', borderRadius: '5px'}
    const witchPhoto = userId && +userId === messageData.recipientId ? mePhoto : photos && photos.small

    return (
        <div style={{width: '100%'}}>
        <div style={messageStyle} >
        {photos && <div>
            {<img src={witchPhoto} alt={''} width={35}/> ?
                <img src={witchPhoto} alt={''} width={35}/> : <Avatar width={35}/>}
        </div>}
        <div>
            {messageData.deletedByRecipient ? <span> {'Deleted by companion'} </span> : messageData.deletedBySender ?
                <span> {'Deleted by you'} </span> :
                <div>
                    <div className={classes.message}> {messageData.body} </div>
                    <div> {messageData.addedAt} </div>
                </div>}
        </div>
    </div>
        </div>
    )
})

export default MessagePrivate