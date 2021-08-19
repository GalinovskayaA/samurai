import {stopSubmit} from "redux-form";
import {BaseThunkType} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {Dispatch} from "redux";

type ChatType = {}

export type ChatPropsType = {
    messages: ChatMessageType[]
}

const initialState: ChatPropsType = {
    messages: [] as ChatMessageType[]
}

export const chatReducer = (state = initialState, action: ChatActionType): ChatPropsType => {
    switch (action.type) {
        case 'SN/CHAT/MESSAGE-RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages],
            }
        default:
            return state;
    }
};

// ----- Actions -----

export const messagesReceivedAC = (messages: ChatMessageType[]) => ({
    type: 'SN/CHAT/MESSAGE-RECEIVED', payload: {messages}
} as const)

// ----- Thunk -----
let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceivedAC(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListenerTC = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}
export const stopMessagesListenerTC = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessagesTC = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

// ----- Types -----

export type ChatActionType = MessagesReceivedACType
type MessagesReceivedACType = ReturnType<typeof messagesReceivedAC>
type ThunkType = BaseThunkType<ChatActionType | ReturnType<typeof stopSubmit>>


export default chatReducer;


