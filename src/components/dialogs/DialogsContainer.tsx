import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {DialogsDataType, MessageDataType, sendMessageAC} from "../../redux/DialogsReducer";
import {StoreStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";


type MapStatePropsType = {
    dialogsData: Array<DialogsDataType>
    messageData: Array<MessageDataType>
}
type MapDispatchPropsType = {
    addSendMessageClick: (message: string) => void
}
export type DialogsContainerPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
    console.log(state)
    return {
        dialogsData: state.dialogPage.dialogsData,
        messageData: state.dialogPage.messageData,
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        addSendMessageClick: (message: string) => {
            dispatch(sendMessageAC(message));
        }
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);