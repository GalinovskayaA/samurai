import {Dispatch} from "redux";
import {dialogsAPI} from "../api/dialogs-api";
import {PhotoUsersType} from "./UsersReducer";


export type MessageDataType = {
    addedAt: string //"2021-08-25T16:01:39.11"
    body: string //"Hello"
    deletedByRecipient: boolean //false
    deletedBySender: boolean //false
    distributionId: null
    id: string //"3b069c31-f62a-4339-9c90-ac8bedfea383"
    isSpam: boolean //false
    recipientId: number //18919
    recipientName: string //"messi"
    senderId: number //15444
    senderName: string //"GalinovskayaA"
    translatedBody: null
    isViewed: boolean
    viewed: boolean
}
export type FriendDialogsType = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotoUsersType
    userName: string
}

export type DialogsType = {
    messageData: Array<MessageDataType>
    friendsDialogs: Array<FriendDialogsType>
    page: number
    count: number
    isStartDialog: boolean
}

const initialState: DialogsType = {
    messageData: [] as Array<MessageDataType>,
    friendsDialogs: [] as Array<FriendDialogsType>,
    page: 1,
    count: 20,
    isStartDialog: false,
}

export const dialogsReducer = (state = initialState, action: ActionDialogType): DialogsType => {
    switch (action.type) {
        case 'SN/DIALOGS/START-DIALOG': {
            return {
                ...state,
                isStartDialog: action.isStartDialog,
            }
        }
        case 'SN/DIALOGS/GET-FRIENDS-DIALOGS': {
            return {
                ...state,
                friendsDialogs: action.friendsDialogs,
            }
        }
        case 'SN/DIALOGS/SET-MESSAGES': {
            return {
                ...state,
                messageData: action.messageData,
            }
        }
        case 'SN/DIALOGS/IS-VIEWED': {
            return {
                ...state,
                messageData: state.messageData.map(m => {
                    return {...m, ...{isViewed: action.isViewed}}
                }),
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
export const getAllDialogsAC = (friendsDialogs: Array<FriendDialogsType>) => {
    return {
        type: 'SN/DIALOGS/GET-FRIENDS-DIALOGS', friendsDialogs: friendsDialogs
    } as const
}
export const setMessagesAC = (messageData: Array<MessageDataType>) => {
    return {
        type: 'SN/DIALOGS/SET-MESSAGES', messageData: messageData
    } as const
}
export const setIsViewedAC = (isViewed: boolean) => {
    return {
        type: 'SN/DIALOGS/IS-VIEWED', isViewed: isViewed
    } as const
}


// ----- Thunk -----

export const startDialogsTC = (userId: number) => {
    return async () => {
        await dialogsAPI.dialogPUT(userId)
    }
}

export const getAllDialogsTC = () => { // активность, наличие новых сообщений
    return async (dispatch: Dispatch) => {
        let data = await dialogsAPI.getAllDialogsGET()
        dispatch(getAllDialogsAC(data.data))
    }
}
export const getFriendMessagesTC = (userId: number, page: number, count: number) => {
    return async (dispatch: Dispatch) => { // сообщения друга не больше 20
        let data = await dialogsAPI.getFriendMessagesGET(userId, page, count)
        dispatch(setMessagesAC(data.data.items))
    }
}
export const sendFriendMessageTC = (userId: number, message: string) => {
    return async () => { // отправить сообщение
        await dialogsAPI.sendFriendMessagePOST(userId, message)
    }
}

export const messageIsSpamTC = (messageId: string) => {
    return async () => {
        await dialogsAPI.sendMessageSpamPOST(messageId)
    }
}

export const messageDeleteTC = (messageId: string) => {
    return async () => {
        await dialogsAPI.deleteOnlyForMeDELETE(messageId)
    }
}

// ----- Types -----

type ActionDialogType = StartDialogACType | GetAllDialogACType | SetMessagesACType | SetIsViewedACType
type StartDialogACType = ReturnType<typeof startDialogAC>
type GetAllDialogACType = ReturnType<typeof getAllDialogsAC>
type SetMessagesACType = ReturnType<typeof setMessagesAC>
type SetIsViewedACType = ReturnType<typeof setIsViewedAC>



