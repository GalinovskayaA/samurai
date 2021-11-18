import React from "react"
import s from "./users.module.css"
import {followTC, unfollowTC, UsersType} from "../../redux/UsersReducer"
import {NavLink} from "react-router-dom"
import Avatar from "../common/Avatar"
//import email from './../../image/email3.png' / TODO: вернуть картинки
import {FriendNewMessageType} from "../dialogs/Message/MessagesPage"
import {useDispatch} from "react-redux"

type PropsType = {
    user: FriendNewMessageType | UsersType
    followingInProgress: Array<string>
    page: number
    count: number
    hasNewMessages?: boolean
    newMessagesCount?: number
    navLink?: string
    startDialog: (userID: string, page: number, count: number) => void
}

const User = (
    {
        user, followingInProgress,
        startDialog, page, count, navLink,
        hasNewMessages, newMessagesCount
    }: PropsType
) => {
    const dispatch = useDispatch()

    const follow = (usersID: string) => {
        dispatch(followTC(usersID))
    }
    const unfollow = (usersID: string) => {
        dispatch(unfollowTC(usersID))
    }

    return (
        <>
            <div className={`col center`}>
                <div className={`text-overflow-hidden padding-s-tb`}> {user.name} </div>
                <NavLink to={navLink + user.id}>
                    {user.photos.small ? <img src={user.photos.small} alt={''} width={75} className={`img-circle`}/> : user.photos.big ?
                        <img src={user.photos.big} alt={''} width={75} className={`img-circle`}/> : <Avatar />}
                </NavLink>
                <div className={`text-overflow-hidden padding-s-tb row left`}> {user.status || "no status"}</div>
                {
                    user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}> Unfollow </button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}> Follow </button>
                }
            </div>
            <div  className={`col center`}>
                <NavLink to={navLink + user.id} className={s.navLink}>
                    <button onClick={() => startDialog(user.id, page, count)} className={`offset-s-t`}> To write </button>
                    {hasNewMessages &&
                    <span>
                        {/*<img src={email} alt={''} height={25}/>*/}
                        <span className={s.newMessagesCount}> {newMessagesCount} </span>
                    </span>}
                </NavLink>
            </div>
        </>)
}

export default User;