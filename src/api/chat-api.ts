let subscribers = {
    'messages-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubSubscriberType[]
}

let ws: WebSocket | null = null
const notifySubscribersAboutStatus = (status: StatusChatType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
const closeHandler = () => {   // пересоздание канала, если он оборвался
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
const openHandler = () => {
    notifySubscribersAboutStatus('ready')
};
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
};
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
};
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler) // отписываемся от старого
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
    notifySubscribersAboutStatus('ready')
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: CallbackType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: CallbackType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubSubscriberType = (status: StatusChatType) => void
type CallbackType = MessageReceivedSubscriberType | StatusChangedSubSubscriberType

type EventsNamesType = 'messages-received' | 'status-changed'
export type StatusChatType = 'pending' | 'ready' | 'error'

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number | string,
    userName: string,
}
