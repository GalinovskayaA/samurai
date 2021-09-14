import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType} from "./redux-store";

type DataType = {
  id: number,
  login: string,
  email: string,
  isAuth: boolean,
}

export type AuthPropsType = {
  id: number,
  login: string,
  email: string,
  isAuth: boolean,
  captchaUrl: string | null
}

const initialState: AuthPropsType = {
    id: 1,
    login: '2',
    email: '3',
    isAuth: false,
    captchaUrl: null
}

export const authReducer = (state = initialState, action: AuthActionType): AuthPropsType => {
  switch (action.type) {
    case 'SN/AUTH/SET-AUTH-USER-DATA': {
      return {
        ...state,
        ...action.data,
      }
    }
    case 'SN/AUTH/GET-CAPTCHA-URL': {
      return {
        ...state,
        captchaUrl: action.captchaUrl
      }
    }
    default:
      return state;
  }
};

// ----- Actions -----

export const setAuthUserDataAC = (id: number, email: string, login: string, isAuth: boolean): SetUserDataACType => {
  return {
    type: 'SN/AUTH/SET-AUTH-USER-DATA', data: {id, email, login, isAuth }
  } as const
}
export const getCaptchaUrlAC = (captchaUrl: string): GetCaptchaUrlACType => {
  return {
    type: 'SN/AUTH/GET-CAPTCHA-URL', captchaUrl
  } as const
}

// ----- Thunk -----

export const getAuthUserDataTC = (): ThunkType => async (dispatch) => {
  let response = await authAPI.me();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    let {id, email, login} = response.data.data
    dispatch(setAuthUserDataAC(id, email, login, true));
  }
}

export const loginTC = (email: string, password: string, rememberMe: boolean, captchaUrl: string | null): ThunkType => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captchaUrl);
  if (response.data.resultCode === ResultCodesEnum.Success) {
    await dispatch(getAuthUserDataTC())
  } else {
    if (response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
      await dispatch(getCaptchaUrlTC())
    }
    let messages = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    dispatch(stopSubmit('login', {_error: messages}));
  }
}

export const getCaptchaUrlTC = (): ThunkType => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlAC(captchaUrl));
}

export const logoutTC = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setAuthUserDataAC(NaN, '', '', false))
  }
}

// ----- Types -----

export type AuthActionType = SetUserDataACType | GetCaptchaUrlACType
type ThunkType = BaseThunkType<AuthActionType | ReturnType<typeof stopSubmit>>

export type SetUserDataACType = { type: 'SN/AUTH/SET-AUTH-USER-DATA', data: DataType }
export type GetCaptchaUrlACType = { type: 'SN/AUTH/GET-CAPTCHA-URL', captchaUrl: string }

export default authReducer;


