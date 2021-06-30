import React, {useEffect, useState} from "react";
import s from "./Paginator.module.css"
import {
  getUsersThunkCreator,
  setPageSize
} from "../../../redux/UsersReduser";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";


const Select = () => {

  const pageSize = useSelector<StoreStateType, number>(state => state.usersPage.pageSize)
  const currentPage = useSelector<StoreStateType, number>(state => state.usersPage.currentPage)
  let [currentPageSize, setCurrentPageSize] = useState(pageSize) // число отобр users на странице

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersThunkCreator(currentPage, currentPageSize))
  }, [dispatch, currentPage, currentPageSize])

  const onChangePageSize = (p: number) => {
    setCurrentPageSize(p)
    dispatch(setPageSize(p))
  }

  return <div>
    <select value={currentPageSize} onChange={e => onChangePageSize(Number(e.currentTarget.value))}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </div>
}

export default Select;
