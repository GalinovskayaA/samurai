import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "c40b2e0c-9f6f-47ff-9727-98eaeb656c77"
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}
export type APIDataResponseType = {
  data: APIResponseType
}