import {v1} from "uuid";


export type DialogsDataType = {
    name: string,
    id: string
}
export type MessageDataType = {
    id: string,
    message: string
}

export type DialogsPropsType = {
    dialogsData: Array<DialogsDataType>
    messageData: Array<MessageDataType>
}

const initialState: DialogsPropsType = {
    dialogsData: [
        {id: v1(), name: "Dimych"},
        {id: v1(), name: "Andrey"},
        {id: v1(), name: "Sveta"},
        {id: v1(), name: "Sasha"},
        {id: v1(), name: "Victor"},
        {id: v1(), name: "Valera"},
    ] as Array<DialogsDataType>,
    messageData: [
        {id: v1(), message: "Hi"},
        {id: v1(), message: "How"},
        {id: v1(), message: "Fine"},
        {id: v1(), message: "Hi"},
        {id: v1(), message: "How"},
        {id: v1(), message: "Fine"},
        {id: v1(), message: "Hi"},
        {id: v1(), message: "How"},
        {id: v1(), message: "Fine"},
    ] as Array<MessageDataType>
}

export const dialogsReducer = (state: DialogsPropsType = initialState, action: SendMessageCreatorType): DialogsPropsType => {
    switch (action.type) {
        case 'SN/DIALOGS/SEND-MESSAGE': {
            return {
                ...state,
                messageData: [{id: v1(), message: action.message}, ...state.messageData]
            }
        }
        default:
            return state;
    }
}

// ----- Actions -----

export const sendMessageAC = (message: string): SendMessageCreatorType => {
    return {
        type: 'SN/DIALOGS/SEND-MESSAGE', message: message
    } as const
}

// ----- Types -----

type SendMessageCreatorType = { type: 'SN/DIALOGS/SEND-MESSAGE', message: string }


