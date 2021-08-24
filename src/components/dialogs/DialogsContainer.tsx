import React from "react";
import {connect} from "react-redux";
import DialogsPage from "./MessagesPage";
import {MessageDataType, setMessagesAC} from "../../redux/DialogsReducer";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";


type MapStatePropsType = {
    messageData: Array<MessageDataType>
}
export type DialogsContainerPropsType = MapStatePropsType

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
    console.log(state)
    return {
        messageData: state.dialogPage.messageData,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(DialogsPage);