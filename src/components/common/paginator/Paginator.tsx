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


const Paginator = ({portionSize, onPageChanged}: PaginatorPropsType) => {
    let dispatch = useDispatch()
    const {totalUsersCount, pageSize, currentPage, filter} = useSelector((state: StoreStateType) => state.usersPage)
    useEffect(() => {
        dispatch(getUsersTC(currentPage, pageSize, filter))
    }, [dispatch, currentPage, pageSize, filter])

    /*  let [portionNumber, setPortionNumber] = useState(1) // номер порции*/
    let [value, setValue] = useState('')

    let currentValue = +value

    const pagesCount = Math.ceil(totalUsersCount / pageSize) // число всего / число отобр на странице = кол-во страниц
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
 //   const portionCount = Math.ceil(pagesCount / portionSize) // кол-во стр / кол-во кнопок на ленте = кол-во порций

    /*const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1 // 1, 11, 21, 31 ...
    const rightPortionPageNumber = portionNumber * portionSize // 10, 20, 30 ...*/

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
        .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged} key={p}/>
        )
    const startPages = pages
        .filter(p => p <= 1)
        .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged} key={p}/>)

    return <div>
        <div>
            enter page
            <input value={value} onChange={onChange} onKeyPress={onKeyPressHandler}/>
            <button onClick={onClickButtonGo}> go</button>
            <p> Число пользователей: {totalUsersCount}</p>
            <div>
                {currentPage > 1 &&
                <button onClick={() => onClickPageChanged(currentPage - 1)}> prev </button>}
                {currentPage > 2 && startPages}
                {currentPage > 2 && <span> ... </span>}

                {pages.filter(p => p >= currentPage - 1 && p <= currentPage + 1).map((p) => <ShowButton
                    currentPage={currentPage} page={p} onPageChanged={onClickPageChanged} key={p}/>)}

                {currentPage < (pagesCount - 1) && <span> ... </span>}
                {currentPage < (pagesCount - 1) && endPages}
                {currentPage < pagesCount &&
                <button onClick={() => onClickPageChanged(currentPage + 1)}> next </button>}
            </div>
            <input type="range" id="range" value={currentPage} step={1}
                   onChange={e => dispatch(setCurrentPageAC(Number(e.currentTarget.value)))}
                   onClick={onChangeSliderPage} min={1} max={pagesCount} style={{width: '50%'}}/>
            <label htmlFor="range"> {'current page: ' + currentPage} </label>
        </div>
        {/*    <div>
      {portionNumber > 1 &&
      <button onClick={() => {
        setPortionNumber(portionNumber - 1)
      }}> prev </button>}
      {portionNumber > 1 && startPages}
      {portionNumber > 1 && <span> ... </span>}

      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged} />
        )}

      {portionCount > portionNumber && <span> ... </span>}
      {portionCount > portionNumber && endPages}
      {portionCount > portionNumber &&
      <button onClick={() => {
        setPortionNumber(portionNumber + 1)
      }}> next </button>}

    </div>*/} {/*прокрутка по 10*/}
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