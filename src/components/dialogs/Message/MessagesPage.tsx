import React, {useEffect} from "react";
import s from "../Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    LocationUsersType,
    PhotoUsersType
} from "../../../redux/UsersReducer";
import {StoreStateType} from "../../../redux/redux-store";
import User from "../../users/User";
import {
    getAllDialogsTC,
    getFriendMessagesTC,
    getFriendsTC, isNoMessageAC,
    startDialogAC,
    startDialogsTC
} from "../../../redux/DialogsReducer";
import {Redirect, useParams} from "react-router-dom";
import {DialogsMessages} from "./DialogsMessages";
import ActionDialogs from "./ActionDialogs";
import {getUserProfileTC, ProfileType} from "../../../redux/ProfileReducer";
import useGaTracker from "../../../useGaTracker";

export type FriendNewMessageType = {
    id: string,
    avatar: string,
    followed: boolean,
    name: string,
    status: string,
    location: LocationUsersType,
    photos: PhotoUsersType
    hasNewMessages: boolean
    newMessagesCount: number
}


const MessagesPage = () => {
    useGaTracker()
    let dispatch = useDispatch()
    let {userId} = useParams<{ userId?: string | undefined }>()
    const {followingInProgress} = useSelector((state: StoreStateType) => state.usersPage)
    const {
        isStartDialog, friendsDialogs, page, count, friends, messageData
    } = useSelector((state: StoreStateType) => state.dialogPage)
    const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)
    const id = useSelector<StoreStateType, number>(state => state.auth.id)
    const profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)

    useEffect(() => {
        dispatch(getUserProfileTC(String(id)))
        dispatch(getFriendsTC(page, count, {term: '', friend: true}))
        dispatch(getAllDialogsTC())
    }, [dispatch, id, page, count])

    const startDialog = (userId: string) => {

        dispatch(startDialogAC(false))
        dispatch(isNoMessageAC(false))
        dispatch(startDialogsTC(Number(userId)))
        dispatch(getFriendMessagesTC(Number(userId), 1, 20))

    }



    const friendsWithNewMessages = friends.reduce((acc, u) => {
        friendsDialogs.some((f) => {
            if (f.id === +u.id) {
                // @ts-ignore
                acc.push({...u, hasNewMessages: f.hasNewMessages, newMessagesCount: f.newMessagesCount})
            }
        })
        return acc
    }, [])
    // @ts-ignore
    const friendsNoMessages = friends.filter(a => friendsWithNewMessages.every(b => a.id !== b.id))

    // @ts-ignore
    const friendsAll: FriendNewMessageType[] = [...friendsNoMessages, ...friendsWithNewMessages]
    const numberOfNewMessages: number = friendsAll.reduce((acc, u) => {
        if (u.newMessagesCount === undefined) {
            return acc
        } else {
            return acc + u.newMessagesCount
        }
    }, 0)
    friendsAll.sort(function (b, a) {
        if (!a.newMessagesCount) {
            a.newMessagesCount = 0
        } else if (!b.newMessagesCount) {
            b.newMessagesCount = 0
        }
        return a.newMessagesCount - b.newMessagesCount
    })

    if (!isAuth) return <Redirect to={'/login'}/>


    return (
        <div className={`row top left gap-offset ${s.dialogsContent}`}>
            <div className={s.dialogItems}> {/*имена друзей*/}
                <div className={s.messagePageInfo}> {'Number of friends: ' + friendsAll.length} </div>
                <div className={s.messagePageInfo}> {'New messages: ' + numberOfNewMessages} </div>
                <div className={`col gap-offset ${s.users}`}>
                    {friendsAll.map((u, index) => <div key={`user-${index}`}>
                        <User user={u} followingInProgress={followingInProgress}
                              startDialog={startDialog} page={page} count={count}
                              navLink={'/dialogs/'} hasNewMessages={u.hasNewMessages}
                              newMessagesCount={u.newMessagesCount}/>
                    </div>)}
                </div>
                <div className={s.messagePageInfo}>{'Action dialogs: '}</div>
                {friendsDialogs.filter(f => f.hasNewMessages).map((u, index) => <div key={`dialog-${index}`}>
                    <ActionDialogs user={u} startDialog={startDialog} page={page} count={count}
                                   navLink={'/dialogs/'}/>
                </div>)}
            </div>
            {isStartDialog && userId ? <div className={s.messages}>
              <DialogsMessages userId={userId} friendsAll={friendsAll} profile={profile} messageData={messageData}/>
            </div> : <h2 className={s.messages}> Select dialog </h2>}
        </div>
    )
}

export default MessagesPage