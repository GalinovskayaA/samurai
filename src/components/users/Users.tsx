import React, {useEffect} from "react";
import {FilterType, getUsersTC} from "../../redux/UsersReducer";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {SearchForm} from "../common/SearchForm";
import Select from "../common/paginator/Select";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import { useHistory } from "react-router-dom";
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
    const { page, count } = useSelector((state: StoreStateType) => state.dialogPage)
    const history = useHistory()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substring(1)) as
            {term: string, friend: string, page: string, pageSize: string}
        let actualPage = currentPage;
        let actualPageSize = pageSize;
        let actualFilter = filter;
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.pageSize) actualPageSize = Number(parsed.pageSize)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false}

        dispatch(getUsersTC(actualPage, actualPageSize, actualFilter))
    }, [dispatch, currentPage, pageSize, filter, history.location.search]);
    useEffect(() => {
        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
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

    return <div>
        <Select/>
        <SearchForm onFilterChanged={onFilterChanged}/>
        <Paginator portionSize={10}
                   onPageChanged={onPageChanged}/>

        {users.map((u, index) => <div>
                <User user={u} key={index} followingInProgress={followingInProgress}
                      startDialog={startDialog} page={page} count={count} navLink={'/profile/'}/>
        </div>
            )}
        {/*{isStartDialog && <div className={s.messages}>
          <DialogsMessages /> диалоговая часть
        </div>}*/}
    </div>
}