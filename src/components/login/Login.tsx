import React from 'react';
import {LoginReduxForm} from "./LoginReduxForm";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/AuthReducer";
import {StoreStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

export type FormLoginDataType = {
  email: string
  password: string
  rememberMe: boolean
  captchaUrl: string | null
}

export const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector<StoreStateType, boolean>(state => state.auth.isAuth)
  const onSubmit = ({email, password, rememberMe, captchaUrl}: FormLoginDataType) => {
    dispatch(loginTC(email, password, rememberMe, captchaUrl))
  }

  if (isAuth) {
    return <Redirect to={"/profile"} />
  }

  return <> <div>
    <h1> Login </h1>
    <LoginReduxForm onSubmit={onSubmit}/>
  </div>
  </>
}