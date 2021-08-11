import React from "react";
import {getUsersTC} from "../../../redux/UsersReducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";


const Select = () => {

  const pageSize = useSelector<StoreStateType, number>(state => state.usersPage.pageSize)
  const currentPage = useSelector<StoreStateType, number>(state => state.usersPage.currentPage)
  const term = useSelector<StoreStateType, string>(state => state.usersPage.filter.term)

  let dispatch = useDispatch()

  const onChangePageSize = (p: number) => {
    dispatch(getUsersTC(currentPage, p, {term: term, friend: null}))
  }

  return <div>
    <select value={pageSize} onChange={e => onChangePageSize(Number(e.currentTarget.value))}>
      <option value={1}>1</option>
      <option value={2}>2</option>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>
  </div>
}

export default Select;
