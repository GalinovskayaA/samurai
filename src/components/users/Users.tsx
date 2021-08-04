import React from "react";
import {UsersPropsType} from "../../redux/UsersReducer";
import Paginator from "../common/paginator/Paginator";
import User from "./User";

type UsersAPIType = {
  onPageChanged: (currentPage: number) => void
  setPageSize: (pageSize: number) => void
  followSuccess: (userID: string) => void
  unfollowSuccess: (userID: string) => void
  followThunkCreator: (userID: string) => void
  unfollowThunkCreator: (userID: string) => void
}
type PropsType = UsersAPIType & UsersPropsType

const Users = (
  {
    totalUsersCount, pageSize, currentPage,
    followingInProgress, users, onPageChanged,
    followThunkCreator, unfollowThunkCreator
  }: PropsType
) => {

  return <div>
    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} portionSize={10}
               onPageChanged={onPageChanged}/>
    { users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                           followThunkCreator={followThunkCreator} unfollowThunkCreator={unfollowThunkCreator}/>) }
  </div>
}

export default Users;