import {instance, APIResponseType} from "./api"
import {UsersType} from "../redux/UsersReducer";

export const getUsersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + ( friend === null ? `` : `&friend=${friend}`))
        .then(response => response.data)
  }
}

export const usersAPI = {
  unfollow(id: string) {
    return instance.delete<APIResponseType>(`follow/${id}`)
  },
  follow(id: string) {
    return instance.post<APIResponseType>(`follow/${id}`)
  },
}

type GetItemsType = {
  items: Array<UsersType>
  totalCount: number
  error: string | null
}