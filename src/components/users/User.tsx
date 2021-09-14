import React from "react";
import {followTC, unfollowTC, UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import Avatar from "../common/Avatar";
import email from './../../image/email3.png'
import {FriendNewMessageType} from "../dialogs/Messege/MessagesPage";
import {useDispatch} from "react-redux";

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
            <div>
                <div> {user.name} </div>
                <NavLink to={navLink + user.id}>
                    {user.photos.small ? <img src={user.photos.small} alt={''} width={75}/> : user.photos.big ?
                        <img src={user.photos.big} alt={''} width={75}/> : <Avatar width={75}/>}
                </NavLink>
                <div> {user.status} </div>
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
            <div>
                <NavLink to={navLink + user.id} style={{textDecoration: 'none'}}>
                    <button onClick={() => startDialog(user.id, page, count)}> To write message</button>
                    {hasNewMessages &&
                    <span>
                        <img src={email} alt={''} height={25}/>
                       <span style={{
                           borderRadius: '50%',
                           textShadow: '3px 4px 5px rgba(0,0,0,.5)',
                           height: '10px',
                           width: '10px'
                       }}> {newMessagesCount} </span>
                    </span>}
                </NavLink>
            </div>
            <span>
      </span>
        </>)
}

export default User;