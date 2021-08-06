import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "6ce2c289-bbfb-4590-a297-cf57ba86954d"
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