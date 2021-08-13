import React from "react";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import Preloader from "../common/preloader";
import {Users} from "./Users";
import {Redirect} from "react-router-dom";

export const UsersPageComponent = () => {
  const isFetching = useSelector<StoreStateType, boolean>(state => state.usersPage.isFetching)
  const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)
  if (!isAuth) return <Redirect to={'/login'}/>
  return <>
    <div>
      {isFetching ? <Preloader/> : null}
    </div>
    <Users />
  </>
}