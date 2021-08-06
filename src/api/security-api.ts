import {instance} from "./api";


export const securityAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
  }
}

type GetCaptchaUrlResponseType = {
  url: string
}