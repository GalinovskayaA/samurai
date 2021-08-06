import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";


export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`)
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<APIResponseType<LoginResponseDataType, ResultCodeForCaptchaEnum | ResultCodesEnum>>(`auth/login`, { email, password, rememberMe, captcha })
  },
  logout() {
    return instance.delete<APIResponseType>(`auth/login`)
  }
}


type MeResponseDataType = {
  id: number
  email: string
  login: string
}
type LoginResponseDataType = {
  userId: number
}