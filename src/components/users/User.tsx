import React from "react";
import {UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";

type PropsType = {
    user: UsersType
    followingInProgress: Array<string>
    page: number
    count: number
    navLink?: string
    follow: (userID: string) => void
    unfollow: (userID: string) => void
    startDialog: (userID: string, page: number, count: number) => void
}

const User = (
    {
        user, followingInProgress,
        follow, unfollow, startDialog,
        page, count, navLink
    }: PropsType
) => {


    return (
        <>
            <div>
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
                <NavLink to={navLink + user.id}>
                    <button onClick={() => startDialog(user.id, page, count)}> To write message</button>
                </NavLink>
            </div>
            <span>
        <span>
          <div> {user.name} </div>
          <div> {user.status} </div>
        </span>
      </span>
        </>)
}

export default User;