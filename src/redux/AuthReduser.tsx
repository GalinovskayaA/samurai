import { Dispatch } from "redux";
import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";


export type DataType = {
  userId: number,
  login: string,
  email: string,
  isAuth: boolean,
}

export type AuthPropsType = {
  id: number,
  login: string,
  email: string,
  isAuth: boolean,
}

const initialState: AuthPropsType = {
    id: 1,
    login: '2',
    email: '3',
    isAuth: false,
}

export const authReduser = (state: AuthPropsType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case "auth/SET-AUTH-USER-DATA": {
      return {
        ...state,
        ...action.data,
       // isAuth: true, // - на удаление
      }
    }
    /*case "SET-IS-FETCHING-USER-DATA": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }*/
    default:
      return state;
  }
};

export const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean) => {
  return {
    type: "auth/SET-AUTH-USER-DATA", data: {id, email, login, isAuth }
  }
}
export const getAuthUserData = () => async (dispatch: Dispatch) => {
  let response = await authAPI.me();
  // this.props.setIsFetchingAC(false);
  if (response.data.resultCode === 0) {
    let {id, email, login} = response.data.data
    console.log(response.data.data)
    dispatch(setAuthUserDataAC(id, email, login, true));
  }
}
export const loginTC = (email: string, password: string, rememberMe: boolean) => async (dispatch: Dispatch) => {
  let response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    // @ts-ignore
    dispatch(getAuthUserData())
  } else {
    let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    dispatch(stopSubmit('login', {_error: messages}));
  }
}
export const logoutTC = () => async (dispatch: Dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataAC(NaN, '', '', false))
  }
}
/*export const setIsFetchingAC = (isFetching: boolean) => {
  return {
    type: "SET-AUTH-USER-DATA", isFetching
  }
}*/

export type AuthActionType = SetUserDataACType

export type SetUserDataACType = {
  type: "auth/SET-AUTH-USER-DATA",
  data: { id: number, email: string, login: string, isAuth: boolean }
}
/*export type SetIsFetchingACType = {
  type: "SET-IS-FETCHING-USER-DATA", isFetching: boolean
}*/

export default authReduser;


