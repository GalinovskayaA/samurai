import React, {useEffect} from "react";
import s from "./Dialogs.module.css"
import {useDispatch, useSelector} from "react-redux";
import {followTC, getUsersTC, LocationUsersType, PhotoUsersType, unfollowTC, UsersType} from "../../redux/UsersReducer";
import {StoreStateType} from "../../redux/redux-store";
import User from "../users/User";
import {getAllDialogsTC, getFriendMessagesTC, startDialogAC, startDialogsTC} from "../../redux/DialogsReducer";
import {Redirect, useParams} from "react-router-dom";
import {DialogsMessages} from "./DialogsMessages";

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
        userId && dispatch(startDialogsTC(Number(userId)))
        dispatch(getFriendMessagesTC(Number(userId), 1, 100))
        return function cleanUp() {
            dispatch(startDialogAC(false))
        }
    },[dispatch, userId])

    /*const dialogsElements = props.dialogsData.map((d) => (<DialogItem key={d.id} id={d.id} name={d.name}/>))*/
    const follow = (usersID: string) => {
        dispatch(followTC(usersID))
    }
    const unfollow = (usersID: string) => {
        dispatch(unfollowTC(usersID))
    }
    const startDialog = (usersID: string, page: number, count: number) => {
        dispatch(startDialogAC(true)) // show dialog window
        dispatch(startDialogsTC(+usersID))
        dispatch(getFriendMessagesTC(Number(usersID), page, count))
    }

    const usersFithNewMessages = users.reduce((acc, u) => {
        friendsDialogs.some(function (f) {
            if (f.id === +u.id) {
                // @ts-ignore
                acc.push({...u, hasNewMessages: f.hasNewMessages, newMessagesCount: f.newMessagesCount})
            }
        })
        return acc
    }, [])
    // @ts-ignore
    const usersNoMessages = users.filter(a => usersFithNewMessages.every(b => a.id !== b.id))

    // @ts-ignore
    const usersAll: FriendNewMessageType[] = [...usersNoMessages, ...usersFithNewMessages]
    const numberOfNewMessages: number = usersAll.reduce((acc, u) => {
        if (u.newMessagesCount === undefined) {
            return acc
        } else {
            return acc + u.newMessagesCount
        }
    }, 0)
    usersAll.sort(function(b, a) {
        if(!a.newMessagesCount) {
            a.newMessagesCount = 0
        } else if (!b.newMessagesCount) {
            b.newMessagesCount = 0
        }
        return a.newMessagesCount - b.newMessagesCount
    })
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
    }

    if (!isAuth) return <Redirect to={'/login'}/>

    return (
        <div className={s.dialogsContent}>
            <div className={s.dialogItems} style={{height: '45em', overflowY: 'auto'}}> {/*имена друзей*/}
                <div> {'Number of friends: ' + usersAll.length} </div>
                <div> {'New messages: ' + numberOfNewMessages} </div>

                {usersAll.map((u, index) => <div>
                    <User user={u} key={u.id} followingInProgress={followingInProgress}
                                           follow={follow} unfollow={unfollow} startDialog={startDialog} page={page} count={count} navLink={'/dialogs/'} hasNewMessages={u.hasNewMessages} newMessagesCount={u.newMessagesCount}/>
                    </div>)}
            </div>
            {isStartDialog && <div className={s.messages}>
              <DialogsMessages userId={userId}/> {/*диалоговая часть*/}
            </div>}
        </div>
    )
}

export default MessagesPage