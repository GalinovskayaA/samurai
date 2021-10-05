import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import s from "./Paginator.module.css"
import cn from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getUsersTC, setCurrentPageAC} from "../../../redux/UsersReducer";
import {StoreStateType} from "../../../redux/redux-store";


type PaginatorPropsType = {
    portionSize: number,
    onPageChanged: (selectedPage: number) => void
}

const Paginator = ({onPageChanged}: PaginatorPropsType) => {
    let dispatch = useDispatch()
    const {totalUsersCount, pageSize, currentPage, filter} = useSelector((state: StoreStateType) => state.usersPage)
    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [dispatch, currentPage, pageSize, filter])

    let [value, setValue] = useState(() => '')

    let currentValue = +value

    const pagesCount = Math.ceil(totalUsersCount / pageSize) // число всего / число отобр на странице = кол-во страниц
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        Number(setValue(e.currentTarget.value))
    }
    const onClickButtonGo = () => {
        onPageChanged(currentValue)
        dispatch(setCurrentPageAC(currentValue))
        setValue('')
    }

    const onClickPageChanged = (p: number) => {
        onPageChanged(p)
        dispatch(setCurrentPageAC(p))
    }
    const onChangeSliderPage = () => {
        onPageChanged(currentPage)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onPageChanged(currentValue)
            dispatch(setCurrentPageAC(currentValue))
            setValue('')
        }
    }
    const endPages = pages
        .filter(p => p >= pages.length)
        .map((p, index) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}
                                       key={index}/>
        )
    const startPages = pages
        .filter(p => p <= 1)
        .map((p, index) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}
                                       key={index}/>)

    return <div className={`offset-s-t`}>
        <div>
            <div className={`row left gap-offset`}>
                <input value={value} onChange={onChange} onKeyPress={onKeyPressHandler} placeholder={'enter page'}/>
                <button onClick={onClickButtonGo}> go</button>
            </div>
            <p> Число пользователей: {totalUsersCount}</p>
            <div className="row">
                {currentPage > 1 &&
                <button onClick={() => onClickPageChanged(currentPage - 1)}> prev </button>}
                {currentPage > 2 && startPages}
                {currentPage > 2 && <span> ... </span>}

                {pages.filter(p => p >= currentPage - 1 && p <= currentPage + 1).map((p, index) => <ShowButton
                    currentPage={currentPage} page={p} onPageChanged={onClickPageChanged} key={index}/>)}

                {currentPage < (pagesCount - 1) && <span> ... </span>}
                {currentPage < (pagesCount - 1) && endPages}
                {currentPage < pagesCount &&
                <button onClick={() => onClickPageChanged(currentPage + 1)}> next </button>}
            </div>
            <div className="row">
                <input type="range" id="range" value={currentPage} step={1}
                       onChange={e => dispatch(setCurrentPageAC(Number(e.currentTarget.value)))}
                       onClick={onChangeSliderPage} min={1} max={pagesCount} className={s.range}/>
            </div>
            <div>
                <h1> {'Page: ' + currentPage} </h1>
            </div>
        </div>
    </div>
}

export default Paginator;

type ShowButtonPropsType = {
    currentPage: number,
    page: number,
    onPageChanged: (currentPage: number) => void
}

const ShowButton = ({currentPage, page, onPageChanged}: ShowButtonPropsType) => {
    return <button className={cn({[s.selectedPage]: currentPage === page}, s.page)}
                   key={page}
                   onClick={() => {
                       onPageChanged(page)
                   }}> {page} </button>
}