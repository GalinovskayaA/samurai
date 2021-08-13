import React, {useEffect} from "react";
import {
    FilterType,
    followTC,
    getUsersTC,
    setCurrentPageAC,
    unfollowTC
} from "../../redux/UsersReducer";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {SearchForm} from "../common/SearchForm";
import Select from "../common/paginator/Select";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";


export const Users = () => {
    let dispatch = useDispatch()

    const {
        pageSize, currentPage,
        followingInProgress, users, filter
    } = useSelector((state: StoreStateType) => state.usersPage)

    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [dispatch, currentPage, pageSize, filter])

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsersTC(currentPage, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }
    const follow = (usersID: string) => {
        dispatch(followTC(usersID))
    }
    const unfollow = (usersID: string) => {
        dispatch(unfollowTC(usersID))
    }

    return <div>
        <Select/>
        <SearchForm onFilterChanged={onFilterChanged}/>
        <Paginator portionSize={10}
                   onPageChanged={onPageChanged}/>
        {users.map(u => <User user={u} key={u.id} followingInProgress={followingInProgress}
                              follow={follow} unfollow={unfollow}/>)}
    </div>
}