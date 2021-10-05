import React, {useEffect} from "react";
import s from "./users.module.css"
import {FilterType, getUsersTC} from "../../redux/UsersReducer";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {SearchForm} from "../common/SearchForm";
import Select from "../common/paginator/Select";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";
import {startDialogAC} from "../../redux/DialogsReducer";


type QueryParamsType = {
    term?: string,
    friend?: string,
    page?: string,
    pageSize?: string
}
export const Users = () => {
    let dispatch = useDispatch()

    const {
        pageSize, currentPage,
        followingInProgress, users, filter
    } = useSelector((state: StoreStateType) => state.usersPage)
    const {page, count} = useSelector((state: StoreStateType) => state.dialogPage)
    const history = useHistory()

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)
        if (pageSize !== 10) query.pageSize = String(pageSize)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage, pageSize, history])

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsersTC(currentPage, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersTC(1, pageSize, filter))
    }

    const startDialog = () => {
        dispatch(startDialogAC(true))
    }

    return <div className={`col`}>
        <Select/>
        <SearchForm onFilterChanged={onFilterChanged}/>
        <Paginator portionSize={10}
                   onPageChanged={onPageChanged}/>
        <div className={`row left padding-s-tb ${s.users}`}>
            {users.map((u, index) => <div>
                    <User user={u} key={`user-${index}`} followingInProgress={followingInProgress}
                          startDialog={startDialog} page={page} count={count} navLink={'/profile/'}/>
                </div>
            )}
        </div>
    </div>
}