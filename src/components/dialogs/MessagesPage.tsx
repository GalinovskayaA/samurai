import React, {CSSProperties, useEffect, useState} from "react";
import s from "./Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    followTC,
    getUsersTC,
    LocationUsersType,
    PhotoUsersType,
    setUsersAC,
    unfollowTC,
    UsersType
} from "../../redux/UsersReducer";
import {StoreStateType} from "../../redux/redux-store";
import User from "../users/User";
import {getAllDialogsTC, getFriendMessagesTC, startDialogAC, startDialogsTC} from "../../redux/DialogsReducer";
import {Redirect, useParams} from "react-router-dom";
import {DialogsMessages} from "./DialogsMessages";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../common/preloader";
import ActionDialogs from "./Messege/MaybeNewFriend";

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
    console.log(userId)
    const {
        pageSize, currentPage, followingInProgress, users
    } = useSelector((state: StoreStateType) => state.usersPage)
    const {
        isStartDialog, messageData, friendsDialogs, page, count
    } = useSelector((state: StoreStateType) => state.dialogPage)
    const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(getUsersTC(1, 100, {term: '', friend: true}))
        dispatch(getAllDialogsTC())
    },[dispatch, userId])

    const follow = (usersID: string) => { // FIXME: !!! дублирование
        dispatch(followTC(usersID))
    }
    const unfollow = (usersID: string) => { // FIXME: !!! дублирование
        dispatch(unfollowTC(usersID))
    }
    const startDialog = (usersID: string) => {
        dispatch(startDialogAC(true)) // show dialog window
    //    dispatch(startDialogsTC(+usersID))
    //    dispatch(getFriendMessagesTC(Number(usersID), 1, 100))
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
                    {friendsAll.map((u, index) => <div>
                        <User user={u} key={index} followingInProgress={followingInProgress}
                              follow={follow} unfollow={unfollow} startDialog={startDialog} page={page} count={count}
                              navLink={'/dialogs/'} hasNewMessages={u.hasNewMessages}
                              newMessagesCount={u.newMessagesCount}/>
                    </div>)}
                    <div style={style}>{'Action dialogs: '}</div>
                    {friendsDialogs.filter(f => f.hasNewMessages).map((u, index) => <div>
                        <ActionDialogs user={u} key={index} followingInProgress={followingInProgress}
                                       follow={follow} unfollow={unfollow} startDialog={startDialog} page={page} count={count}
                                       navLink={'/dialogs/'} />
                    </div>)}

                </div>
            {isStartDialog && userId && <div className={s.messages}>
              <DialogsMessages userId={userId} friendsAll={friendsAll}/> {/*диалоговая часть*/}
            </div>}
        </div>
    )
}

export default MessagesPage