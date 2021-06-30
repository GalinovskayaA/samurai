import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import classes from "./Dialogs.module.css";
import Message, {MessageDataType} from "./Messege/Message";
import DialogItem, {DialogsDataType} from "./DialogItem/DialogsItem";
import {v1} from "uuid";
import DialogsMessages from "./DialogsElements";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import {DialogsPropsType, sendMessageCreator} from "../../redux/DialogsReduser";
import {StoreStateType} from "../../redux/redux-store";
import {compose, Dispatch} from "redux";
import {Redirect} from "react-router-dom";
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