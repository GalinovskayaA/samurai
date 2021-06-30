import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import s from "./Paginator.module.css"


type PaginatorPropsType = {
  pageSize: number,
  totalItemsCount: number,
  currentPage: number,
  portionSize: number,
  onPageChanged: (selectedPage: number) => void
}


const Paginator = ({totalItemsCount, pageSize, currentPage, portionSize, onPageChanged}: PaginatorPropsType) => {


  let [portionNumber, setPortionNumber] = useState(1) // номер порции
  let [selectedPage, setSelectedPage] = useState(currentPage)
  let [value, setValue] = useState('')
  let currentValue = +value

  const pagesCount = Math.ceil(totalItemsCount / pageSize) // число всего / число отобр на странице = кол-во страниц
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  const portionCount = Math.ceil(pagesCount / portionSize) // кол-во стр / кол-во кнопок на ленте = кол=во порций
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1 // 1, 11, 21, 31 ...
  const rightPortionPageNumber = portionNumber * portionSize // 10, 20, 30 ...


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    Number(setValue(e.currentTarget.value))
  }
  const onClickButtonGo = () => {
    onPageChanged(currentValue)
   // setSelectedPage(currentValue)
    //  setPortionNumber(selectedPage / portionSize)
    setValue('')
  }

  const onClickPageChanged = (p: number) => {
    onPageChanged(p)
  //  setSelectedPage(p)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onPageChanged(currentValue)
    //  setSelectedPage(currentValue)
    //  setPortionNumber(selectedPage / portionSize)
      setValue('')
    }
  }
  const endPages = pages
    .filter(p => p >= pages.length - 2)
    .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}/>
    )
  const startPages = pages
    .filter(p => p <= 3)
    .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}/>)

  return <div>
    <div>
      enter page
      <input value={value} onChange={onChange} onKeyPress={onKeyPressHandler}/>
      <button onClick={onClickButtonGo}> go </button>
    </div>
    <div>
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
  let className = currentPage === page ? s.selectedPage : s.page
  console.log(currentPage, page)
  return <button className={className}
                 key={page}
                 onClick={() => {
                   onPageChanged(page)
                 }}> {page} </button>
}