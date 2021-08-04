import {v1} from "uuid";
import {MessageDataType} from "../components/dialogs/Messege/Message";
import {DialogsDataType} from "../components/dialogs/DialogItem/DialogsItem";

/*const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';*/
const SEND_MESSAGE = 'SEND-MESSAGE';


export const dialogsReducer = (state: DialogsPropsType = initialState, action: SendMessageCreatorType): DialogsPropsType => {
  switch (action.type) {
    /*case UPDATE_NEW_MESSAGE_BODY: { // не нужно, так как есть Redux-form
      return {
        ...state,
        newMessageBody: action.message
      }
    }*/
    case SEND_MESSAGE: {
      return {
        ...state,
        messageData: [{id: v1(), message: action.message}, ...state.messageData],
        newMessageBody: "",
      }
    }
/*      let message = state.newMessageBody;*/
/*      return {...state, messageData: [{id: v1(), message: action.message}, ...state.messageData], newMessageBody: ''};*/
    default:
      return state;
  }
}

// action
/*export const updateNewMessageCreator = (message: string) => {
  return {
    type: 'UPDATE-NEW-MESSAGE-BODY', message: message
  } as const
}*/
export const sendMessageCreator = (message: string) => {
  return {
    type: 'SEND-MESSAGE', message: message
  } as const
}

// action type
/*type UpdateNewMessageCreatorType = {
  type: 'UPDATE-NEW-MESSAGE-BODY',
  message: string,
  newMessageBody: string
}*/
type SendMessageCreatorType = {
  type: 'SEND-MESSAGE',
  message: string,
  newMessageBody: string,
  messageData: Array<MessageDataType>,
}

export type DialogsPropsType = {
  dialogsData: Array<DialogsDataType>
  messageData: Array<MessageDataType>
  newMessageBody: string
}
const initialState: DialogsPropsType = {
  dialogsData: [
    { id: v1(), name: "Dimych" },
    { id: v1(), name: "Andrey" },
    { id: v1(), name: "Sveta" },
    { id: v1(), name: "Sasha" },
    { id: v1(), name: "Victor" },
    { id: v1(), name: "Valera" },
  ] as Array<DialogsDataType>,
  messageData: [
    { id: v1(), message: "Hi" },
    { id: v1(), message: "How" },
    { id: v1(), message: "Fine" },
  ] as Array<MessageDataType>,
  newMessageBody: "LaLalA"
}


