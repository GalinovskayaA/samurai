import {stopSubmit} from "redux-form";
import {BaseThunkType} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusChatType} from "../api/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";


export type ChatMessageType = ChatMessageAPIType & {id: string}

export type ChatPropsType = {
    messages: ChatMessageType[]
    status: StatusChatType
}

const initialState: ChatPropsType = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusChatType
}

export const chatReducer = (state = initialState, action: ChatActionType): ChatPropsType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGE-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 100),
            }
        case 'SN/CHAT/STATUS-CHANGED':
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state;
    }
};

// ----- Actions -----

export const messagesReceivedAC = (messages: ChatMessageAPIType[]) => ({
    type: 'SN/CHAT/MESSAGE-RECEIVED', payload: {messages}
} as const)
export const statusChangedAC = (status: StatusChatType) => ({
    type: 'SN/CHAT/STATUS-CHANGED', payload: {status}
} as const)

// ----- Thunk -----

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
let _statusChangedHandler: ((status: StatusChatType) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceivedAC(messages))
        }
    }
    return _newMessageHandler
}
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChangedAC(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListenerTC = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListenerTC = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessagesTC = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

// ----- Types -----

export type ChatActionType = MessagesReceivedACType | SetStatusACType
type MessagesReceivedACType = ReturnType<typeof messagesReceivedAC>
type SetStatusACType = ReturnType<typeof statusChangedAC>
type ThunkType = BaseThunkType<ChatActionType | ReturnType<typeof stopSubmit>>


export default chatReducer;


