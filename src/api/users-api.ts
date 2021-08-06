import {instance, APIResponseType} from "./api"
import {UsersType} from "../redux/UsersReducer";


export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data)
  },
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