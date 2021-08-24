import {Dispatch} from "redux";
import {dialogsAPI} from "../api/dialogs-api";


export type MessageDataType = {
    messageId: string,
    body: string,
    date: string
}

export type DialogsType = {
    messageData: Array<MessageDataType>
    page: number
    count: number
    isStartDialog: boolean
    isViewed: boolean | null
}

const initialState: DialogsType = {
    messageData: [] as Array<MessageDataType>,
    page: 1,
    count: 20,
    isStartDialog: false,
    isViewed: null as boolean | null
}

export const dialogsReducer = (state = initialState, action: ActionDialogType): DialogsType => {
    switch (action.type) {
        case 'SN/DIALOGS/START-DIALOG': {
            return {
                ...state,
                isStartDialog: action.isStartDialog,
            }
        }
        case 'SN/DIALOGS/SET-MESSAGES': {
            return {
                ...state,
                messageData: action.messageData,
            }
        }
        default:
            return state;
    }
}

// ----- Actions -----

export const startDialogAC = (isStartDialog: boolean) => {
    return {
        type: 'SN/DIALOGS/START-DIALOG', isStartDialog: isStartDialog
    } as const
}
export const setMessagesAC = (messageData: Array<MessageDataType>) => {
    return {
        type: 'SN/DIALOGS/SET-MESSAGES', messageData: messageData
    } as const
}


// ----- Thunk -----

export const getAllDialogsTC = () => {
    return async (dispatch: Dispatch) => {
        let data = await dialogsAPI.getAllDialogsGET()
        dispatch(setMessagesAC(data.data))
        console.log('Санка: все диалоги ' + data)
    }
}
export const getFriendMessagesTC = (userId: number, page: number, count: number) => {
    return async (dispatch: Dispatch) => {
        let data = await dialogsAPI.getFriendMessagesGET(userId, page, count)
        dispatch(setMessagesAC(data.data.items))
        console.log('Санка: получить сообщения друга ' + data.data.items)
    }
}

// ----- Types -----

type ActionDialogType = StartDialogACType | SetMessagesACType
type StartDialogACType = ReturnType<typeof startDialogAC>
type SetMessagesACType = ReturnType<typeof setMessagesAC>



