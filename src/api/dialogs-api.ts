import {instance} from "./api"


export const dialogsAPI = {
    dialogPUT(userId: number) { // начало диолога
        return instance.put(`dialogs/${userId}`)
    },
    getAllDialogsGET() {
        return instance.get(`dialogs`)
    },
    getFriendMessagesGET(userId: number, page: number, count: number) {
        return instance.get(`dialogs/${userId}/messages?page=${page}&count=${count}`)
    },
    sendFriendMessagePOST(userId: number, message: string) {
        return instance.post(`dialogs/${userId}/messages`, {body: message})
    },
    isViewedMessageGET(messageId: string) {
        return instance.get(`dialogs/messages/${messageId}/viewed`)
    },
    sendMessageSpamPOST(messageId: number) {
        return instance.post(`dialogs/messages/${messageId}/spam`)
    },
    deleteOnlyForMeDELETE(messageId: number) {
        return instance.delete(`dialogs/messages/${messageId}`)
    },
    restoreMessagePUT(messageId: number) {
        return instance.put(`dialogs/messages/${messageId}/restore`)
    },
    getMessagesNewestDateGET(userId: number, date: string) {
        return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`)
    },
    newMessageListGET() {
        return instance.get(`dialogs/messages/new/count`)
    }
}

type DilogsResponseType = {}