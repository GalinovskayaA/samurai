import axios from "axios";
import {ProfileType} from "../redux/ProfileReducer";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "6ce2c289-bbfb-4590-a297-cf57ba86954d"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },
  unfollow(id: string) {
    return instance.delete(`follow/${id}`)
    //  .then(response => response.data) - на удаление
  },
  follow(id: string) {
    return instance.post(`follow/${id}`)
    //  .then(response => response.data) - на удаление
  },
}

export const profileAPI = {
  getProfile(id: string) {
    return instance.get(`profile/` + id);
  },
  getStatus(id: string) {
    return instance.get(`profile/status/` + id);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, {status: status} );
  },
  savePhoto(photoFile: string) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfileTC(profile: ProfileType) {
    return instance.put(`profile`, profile);
  }
}

                     /* или так */

export const getUsers = (currentPage = 1, pageSize = 10) => {
  return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`)
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<LoginMeResponseType>(`auth/login`, { email, password, rememberMe, captcha })
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodeForCaptchaEnum {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: { id: number, email: string, login: string }
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: Array<string>
}
type LoginMeResponseType = {
  data: { userId: number }
  resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
  messages: Array<string>
}