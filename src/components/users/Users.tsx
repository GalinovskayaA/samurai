import React from "react";
import {FilterType, UsersStatePropsType} from "../../redux/UsersReducer";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {SearchForm} from "../common/SearchForm";
import Select from "../common/paginator/Select";

type UsersAPIType = {
    onPageChanged: (currentPage: number) => void
    onFilterChanged: (filter: FilterType) => void
    setPageSize: (pageSize: number) => void
    followSuccess: (userID: string) => void
    unfollowSuccess: (userID: string) => void
    followThunkCreator: (userID: string) => void
    unfollowThunkCreator: (userID: string) => void
}
type PropsType = UsersAPIType & UsersStatePropsType

const Users = (
    {
        totalUsersCount, pageSize, currentPage,
        followingInProgress, users, onPageChanged,
        followThunkCreator, unfollowThunkCreator, onFilterChanged
    }: PropsType
) => {

    return <div>
        <Select/>
        <SearchForm onFilterChanged={onFilterChanged}/>
        <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} portionSize={10}
                   onPageChanged={onPageChanged}/>
        {users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                              followThunkCreator={followThunkCreator} unfollowThunkCreator={unfollowThunkCreator}/>)}
    </div>
}

export default Users;