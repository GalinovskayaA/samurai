import React from "react";
import {MessageDataType} from "./Messege/Message";
import {DialogsDataType} from "./DialogItem/DialogsItem";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {sendMessageCreator} from "../../redux/DialogsReducer";
import {StoreStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";



type MapStatePropsType = {
  dialogsData: Array<DialogsDataType>
  messageData: Array<MessageDataType>
  newMessageBody: string
/*  isAuth: boolean*/
}
type MapDispatchPropsType = {
  addSendMessageClick: (message: string) => void
//  updateNewMessageCreator: (message: string) => void
}
export type DialogsContainerPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  console.log(state)
  return {
    dialogsData: state.dialogPage.dialogsData,
    messageData: state.dialogPage.messageData,
    newMessageBody: state.dialogPage.newMessageBody,
/*    isAuth: state.auth.isAuth*/
  }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    addSendMessageClick: (message: string) => {
      dispatch(sendMessageCreator(message));
    },

   /* updateNewMessageCreator: (message: string) => {
      dispatch(updateNewMessageCreator(message));
    }*/ // -----> // не нужно, так как есть Redux-form
  }
}

/*const AuthRedirectComponent = (props: DialogsContainerPropsType) => {
  if (!props.isAuth) return <Redirect to={"/login"}/>
  return <Dialogs {...props}/>
}

compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)

const AuthRedirectComponent: any = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);*/

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);