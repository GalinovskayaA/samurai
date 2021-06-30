import React, {useEffect, useState} from "react";
import {getUsersThunkCreator, setUsers, UsersPropsType, UsersType} from "../../redux/UsersReduser";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";

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
    totalUsersCount, pageSize, currentPage, setPageSize,
    followingInProgress, users, onPageChanged,
    followThunkCreator, unfollowThunkCreator
  }: PropsType
) => {
  /*let dispatch = useDispatch()




  let [currentPageSize, setCurrentPageSize] = useState(pageSize) // число отобр users на странице
  let [usersInPage, setUsersInPage] = useState(users) // число отобр users на странице
  const onChangePageSize = (p: number, users: Array<UsersType>) => {
    setCurrentPageSize(p)
    dispatch(setPageSize(p))
    setUsersInPage(users)
  }

  useEffect(() => {
    dispatch(getUsersThunkCreator)
  }, [pageSize, users, currentPageSize, dispatch])*/


  return <div>
    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} portionSize={10}
               onPageChanged={onPageChanged}/>
    {/*<select value={currentPageSize} onChange={e => onChangePageSize(Number(e.currentTarget.value), users)}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>*/}
    {
      users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                           followThunkCreator={followThunkCreator} unfollowThunkCreator={unfollowThunkCreator}/>)
    }
  </div>
}

export default Users;