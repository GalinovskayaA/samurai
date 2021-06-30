import React from "react";
import {UsersType} from "../../redux/UsersReduser";
import {NavLink} from "react-router-dom";
import Avatar from "../common/avatar";

type PropsType = {
  user: UsersType
  followingInProgress: Array<string>
  followThunkCreator: (userID: string) => void
  unfollowThunkCreator: (userID: string) => void
}

const User = (
  {
    user, followingInProgress,
    followThunkCreator, unfollowThunkCreator
  }: PropsType
) => {

  return (
    <div>
      <div>
        <div>
          <NavLink to={'/profile/' + user.id}>
            {<img src={user.photos.small} alt={''} width={75}/> && <Avatar width={75}/>}
        </NavLink>
        </div>
        <div>
          {
            user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                unfollowThunkCreator(user.id)
              }}> Unfollow </button>
              : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                followThunkCreator(user.id)
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
    </div>)
}

export default User;