import React from "react";
import {UsersType} from "../../redux/UsersReducer";
import {NavLink} from "react-router-dom";
import Avatar from "../common/avatar";

type PropsType = {
    user: UsersType
    followingInProgress: Array<string>
    follow: (userID: string) => void
    unfollow: (userID: string) => void
}

const User = (
    {
        user, followingInProgress,
        follow, unfollow
    }: PropsType
) => {

    return (
        <>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        {user.photos.small ? <img src={user.photos.small} alt={''} width={75}/> : user.photos.big ? <img src={user.photos.big} alt={''} width={75}/> : <Avatar width={75}/>}
                    </NavLink>
                </div>
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
            </div>
            <span>
        <span>
          <div> {user.name} </div>
          <div> {user.status} </div>
        </span>
        <span>
          <div> {"user.location.country"} </div>
          <div> {"user.location.city"} </div>
        </span>
      </span>
        </>)
}

export default User;