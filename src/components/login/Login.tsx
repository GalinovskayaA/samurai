import React from 'react';
import {LoginReduxForm} from "./LoginReduxForm";
import {connect, useDispatch} from "react-redux";
import {loginTC, logoutTC} from "../../redux/AuthReduser";
import {StoreStateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

export type FormDataType = {
  email: string
  password: string
  rememberMe: boolean
  captchaUrl: string | null
}

const Login = ({isAuth}: MapStatePropsType) => {
  const dispatch = useDispatch()
  const onSubmit = ({email, password, rememberMe, captchaUrl}: FormDataType) => {
    console.log(email, password, rememberMe, captchaUrl)
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
type MapStatePropsType = {
  isAuth: boolean
}
let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth
  }
}

export default connect(mapStateToProps, {loginTC, logoutTC})(Login);