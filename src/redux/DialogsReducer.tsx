import {Dispatch} from "redux";
import {dialogsAPI} from "../api/dialogs-api";
import {
    FilterType,
    PhotoUsersType,
    UsersType
} from "./UsersReducer";
import {getUsersAPI} from "../api/users-api";
import {combineMessages} from "../utils/messages.helper";

export type MessageLoadingStatusType = 'loading' | 'failed' | 'success' | null
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
    friends: Array<UsersType>
    totalFriendsCount: number
    page: number
    count: number
    isStartDialog: boolean
    isLoadingMessage: MessageLoadingStatusType
    isNoMessage: boolean
}

const initialState: DialogsType = {
    messageData: [] as Array<MessageDataType>,
    friendsDialogs: [] as Array<FriendDialogsType>,
    friends: [] as Array<UsersType>,
    totalFriendsCount: 0,
    page: 1,
    count: 30,
    isStartDialog: false,
    isLoadingMessage: null,
    isNoMessage: false
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
        case 'SN/DIALOGS/SET-FRIENDS': {
            return {
                ...state,
                friends: action.friends
            }
        }
        case 'SN/DIALOGS/SET-PAGE': {
            return {
                ...state,
                page: action.page
            }
        }
        case 'SN/DIALOGS/SET-COUNT': {
            return {
                ...state,
                count: action.count
            }
        }
        case 'SN/DIALOGS/SET-TOTAL-FRIENDS-COUNT': {
            return {
                ...state,
                totalFriendsCount: action.totalFriendsCount
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
        case 'SN/DIALOGS/IS-LOADING-MESSAGE': {
            return {
                ...state,
                isLoadingMessage: action.isLoadingMessage,
            }
        }
        case 'SN/DIALOGS/IS-NO-MESSAGE': {
            return {
                ...state,
                isNoMessage: action.isNoMessage,
            }
        }
        case 'SN/DIALOGS/SEND-MESSAGE': {
            return {
                ...state,
                messageData: [...state.messageData, action.message],
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
export const setFriendsAC = (friends: Array<UsersType>) => {
    return {type: 'SN/DIALOGS/SET-FRIENDS', friends: friends} as const
}
export const setPageAC = (page: number) => {
    return {type: 'SN/DIALOGS/SET-PAGE', page: page} as const
}
export const setCountAC = (count: number) => {
    return {type: 'SN/DIALOGS/SET-COUNT', count: count} as const
}
export const setTotalFriendsCountAC = (totalFriendsCount: number) => {
    return {type: 'SN/DIALOGS/SET-TOTAL-FRIENDS-COUNT', totalFriendsCount: totalFriendsCount} as const
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
export const isLoadingMessageAC = (isLoadingMessage: MessageLoadingStatusType) => {
    return {
        type: 'SN/DIALOGS/IS-LOADING-MESSAGE', isLoadingMessage: isLoadingMessage
    } as const
}
export const isNoMessageAC = (isNoMessage: boolean) => {
    return {
        type: 'SN/DIALOGS/IS-NO-MESSAGE', isNoMessage: isNoMessage
    } as const
}
export const sendMessageAC = (message: MessageDataType) => {
    return {
        type: 'SN/DIALOGS/SEND-MESSAGE', message: message
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
export const getFriendMessagesTC = (userId: number, page: number, count: number, messageData: MessageDataType[] = []) => {
    return async (dispatch: Dispatch) => { // сообщения друга не больше 20
        let data = await dialogsAPI.getFriendMessagesGET(userId, page, count)
        const newMessageData = combineMessages(messageData, data.data.items)
        if (data.data.items.length === 0) {
            dispatch(isNoMessageAC(true))
            return
        }
        dispatch(setMessagesAC(newMessageData))
        dispatch(startDialogAC(true))
    }
}
export const sendFriendMessageTC = (userId: number, message: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(isLoadingMessageAC('loading'))
        let data = await dialogsAPI.sendFriendMessagePOST(userId, message)
        if (data.data.resultCode === 0) {
            dispatch(isLoadingMessageAC('success'))
            dispatch(sendMessageAC(data.data.data.message))
        } else {
            dispatch(isLoadingMessageAC('failed'))
        }
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

export const getFriendsTC = (page: number, count: number, filter: FilterType) => {
    return async (dispatch: Dispatch) => {
        dispatch(setPageAC(page))
        dispatch(setCountAC(count))
        let data = await getUsersAPI.getUsers(page, count, filter.term, filter.friend);
        dispatch(setFriendsAC(data.items))
        dispatch(setTotalFriendsCountAC(data.totalCount))
    }
}

// ----- Types -----

type ActionDialogType =
    StartDialogACType
    | GetAllDialogACType
    | SetFriendsACType
    | SetPageACType
    | SetCountACType
    | SetTotalFriendsCountACType
    | SetMessagesACType
    | SetIsViewedACType
    | IsLoadingMessageACType
    | SendMessageACType
    | IsNoMessageACType
type StartDialogACType = ReturnType<typeof startDialogAC>
type GetAllDialogACType = ReturnType<typeof getAllDialogsAC>
type SetFriendsACType = ReturnType<typeof setFriendsAC>
type SetPageACType = ReturnType<typeof setPageAC>
type SetCountACType = ReturnType<typeof setCountAC>
type SetTotalFriendsCountACType = ReturnType<typeof setTotalFriendsCountAC>
type SetMessagesACType = ReturnType<typeof setMessagesAC>
type SetIsViewedACType = ReturnType<typeof setIsViewedAC>
type IsLoadingMessageACType = ReturnType<typeof isLoadingMessageAC>
type IsNoMessageACType = ReturnType<typeof isNoMessageAC>
type SendMessageACType = ReturnType<typeof sendMessageAC>