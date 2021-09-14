import React from "react";
import {connect} from "react-redux";
import DialogsPage from "./Messege/MessagesPage";
import {MessageDataType} from "../../redux/DialogsReducer";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";


type MapStatePropsType = {
    messageData: Array<MessageDataType>
}

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
    return {
        messageData: state.dialogPage.messageData,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {}),
    withAuthRedirect
)(DialogsPage);