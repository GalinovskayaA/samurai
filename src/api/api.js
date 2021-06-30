import axios from "axios";


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
  unfollow(id) {
    return instance.delete(`follow/${id}`)
    //  .then(response => response.data) - на удаление
  },
  follow(id) {
    return instance.post(`follow/${id}`)
    //  .then(response => response.data) - на удаление
  },
}

export const profileAPI = {
  getProfile(id) {
    return instance.get(`profile/` + id);
  },
  getStatus(id) {
    return instance.get(`profile/status/` + id);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, {status: status} );
  }
}

                     /* или так */

export const getUsers = (currentPage = 1, pageSize = 10) => {
  return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response => response.data)
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email, password, rememberMe = false) {
    return instance.post(`auth/login`, { email, password, rememberMe })
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}