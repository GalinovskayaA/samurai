import React, {CSSProperties, useEffect} from "react";
import s from "../Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    getFriendsTC,
    getUsersTC,
    LocationUsersType,
    PhotoUsersType
} from "../../../redux/UsersReducer";
import {StoreStateType} from "../../../redux/redux-store";
import User from "../../users/User";
import {getAllDialogsTC, getFriendMessagesTC, startDialogAC, startDialogsTC} from "../../../redux/DialogsReducer";
import {Redirect, useParams} from "react-router-dom";
import {DialogsMessages} from "./DialogsMessages";
import ActionDialogs from "./ActionDialogs";
import {getUserProfileTC, ProfileType} from "../../../redux/ProfileReducer";

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
    let dispatch = useDispatch()
    let {userId} = useParams<{ userId?: string | undefined }>()
    const { followingInProgress, users } = useSelector((state: StoreStateType) => state.usersPage)
    const {
        isStartDialog, friendsDialogs, page, count
    } = useSelector((state: StoreStateType) => state.dialogPage)
    const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)
    const id = useSelector<StoreStateType, number>(state => state.auth.id)
    const profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)

    useEffect(() => {
        dispatch(getUserProfileTC(String(id)))
        dispatch(getFriendsTC(1, 30, {term: '', friend: true}))
        dispatch(getAllDialogsTC())
    },[dispatch, id])

    const startDialog = (userId: string) => {
        dispatch(startDialogAC(false))
        dispatch(startDialogsTC(+userId))
        dispatch(startDialogAC(true)) // show dialog window
    }

    const friendsWithNewMessages = users.reduce((acc, u) => {
        friendsDialogs.some((f) => {
            if (f.id === +u.id) {
                // @ts-ignore
                acc.push({...u, hasNewMessages: f.hasNewMessages, newMessagesCount: f.newMessagesCount})
            }
        })
        return acc
    }, [])
    // @ts-ignore
    const friendsNoMessages = users.filter(a => friendsWithNewMessages.every(b => a.id !== b.id))


    // @ts-ignore
    const friendsAll: FriendNewMessageType[] = [...friendsNoMessages, ...friendsWithNewMessages]
    const numberOfNewMessages: number = friendsAll.reduce((acc, u) => {
        if (u.newMessagesCount === undefined) {
            return acc
        } else {
            return acc + u.newMessagesCount
        }
    }, 0)
    friendsAll.sort(function(b, a) {
        if(!a.newMessagesCount) {
            a.newMessagesCount = 0
        } else if (!b.newMessagesCount) {
            b.newMessagesCount = 0
        }
        return a.newMessagesCount - b.newMessagesCount
    })
    const style: CSSProperties = {fontWeight: 'bold', marginTop: '5px'}

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogsContent}>
            <div className={s.dialogItems} style={{height: 700, overflow: "auto"}}> {/*имена друзей*/}

                <div style={style}> {'Number of friends: ' + friendsAll.length} </div>
                <div style={style}> {'New messages: ' + numberOfNewMessages} </div>
                {friendsAll.map((u, index) => <div key={`user-${index}`}>
                    <User user={u} followingInProgress={followingInProgress}
                          startDialog={startDialog} page={page} count={count}
                          navLink={'/dialogs/'} hasNewMessages={u.hasNewMessages}
                          newMessagesCount={u.newMessagesCount}/>
                </div>)}
                <div style={style}>{'Action dialogs: '}</div>
                {friendsDialogs.filter(f => f.hasNewMessages).map((u, index) => <div key={`dialog-${index}`}>
                    <ActionDialogs user={u} startDialog={startDialog} page={page} count={count}
                                   navLink={'/dialogs/'} />
                </div>)}

            </div>
            {isStartDialog && userId && <div className={s.messages}>
              <DialogsMessages userId={userId} friendsAll={friendsAll} profile={profile}/> {/*диалоговая часть*/}
            </div>}
        </div>
    )
}

export default MessagesPage