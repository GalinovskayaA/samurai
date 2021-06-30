import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Paginator.module.css"


type PaginatorPropsType = {
  pageSize: number,
  totalItemsCount: number,
  currentPage: number,
  portionSize: number,
  onPageChanged: (selectedPage: number) => void
}


const Paginator = ({totalItemsCount, pageSize, currentPage, portionSize, onPageChanged}: PaginatorPropsType) => {

/*  let [portionNumber, setPortionNumber] = useState(1) // номер порции*/
  let [value, setValue] = useState('')
  let [valueSlider, setValueSlider] = useState(currentPage)

  let currentValue = +value

  const pagesCount = Math.ceil(totalItemsCount / pageSize) // число всего / число отобр на странице = кол-во страниц
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  const portionCount = Math.ceil(pagesCount / portionSize) // кол-во стр / кол-во кнопок на ленте = кол-во порций

  /*const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1 // 1, 11, 21, 31 ...
  const rightPortionPageNumber = portionNumber * portionSize // 10, 20, 30 ...*/

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    Number(setValue(e.currentTarget.value))
  }
  const onClickButtonGo = () => {
    onPageChanged(currentValue)
    setValueSlider(currentValue)
    setValue('')
  }

  const onClickPageChanged = (p: number) => {
    onPageChanged(p)
    setValueSlider(p)
  }
  const onChangeSliderPage = () => {
    onPageChanged(valueSlider)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onPageChanged(currentValue)
      setValueSlider(currentValue)
      setValue('')
    }
  }
  const endPages = pages
    .filter(p => p >= pages.length)
    .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}/>
    )
  const startPages = pages
    .filter(p => p <= 1)
    .map((p) => <ShowButton currentPage={currentPage} page={p} onPageChanged={onClickPageChanged}/>)

  return <div>
    <div>
      enter page
      <input value={value} onChange={onChange} onKeyPress={onKeyPressHandler}/>
      <button onClick={onClickButtonGo}> go </button>
      <div>
        {valueSlider > 1 &&
        <button onClick={ () => onClickPageChanged(valueSlider - 1) }> prev </button>}
        {valueSlider > 2 && startPages}
        {valueSlider > 2 && <span> ... </span>}

        {pages.filter(p => p>=valueSlider-1 && p<=valueSlider+1).map((p) => <ShowButton currentPage={valueSlider} page={p} onPageChanged={onClickPageChanged}/>)}

        {valueSlider < (pagesCount - 1) && <span> ... </span>}
        {valueSlider < (pagesCount - 1) && endPages}
        {valueSlider < pagesCount &&
        <button onClick={ () => onClickPageChanged(valueSlider + 1) }> next </button>}
      </div>
      <input type="range" id="range" value={valueSlider} step={1} onChange={e => setValueSlider(Number(e.currentTarget.value))}
      onClick={onChangeSliderPage} min={1} max={pagesCount} style={{width: '50%'}}/>
      <label htmlFor="range"> {valueSlider + ' page'} </label>
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
  let className = currentPage === page ? s.selectedPage : s.page
  return <button className={className}
                 key={page}
                 onClick={() => {
                   onPageChanged(page)
                 }}> {page} </button>
}