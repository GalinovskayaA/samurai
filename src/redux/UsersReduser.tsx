import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objects-helper";

export type UsersType = {
  id: string,
  avatar: string,
  followed: boolean,
  name: string,
  status: string,
  location: LocationUsersType,
  photos: PhotoUsersType
}
export type LocationUsersType = {
  city: string,
  country: string
}
export type PhotoUsersType = {
  small: string,
  big: string
}

export type UsersPropsType = {
  users: Array<UsersType>,
  pageSize: number,
  totalUsersCount: number,
  currentPage: number,
  isFetching: boolean,
  followingInProgress: Array<string>
}

const initialState: UsersPropsType = {
  users: [] as Array<UsersType>,
  pageSize: 10,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
}

export const usersReduser = (state: UsersPropsType = initialState, action: UsersActionType) => {
  switch (action.type) {
    case "FOLLOW": {
      return {
        ...state,
        users: updateObjectArray(state.users, action.userID, "id", {followed: true})
        /*users: state.users.map(u => {
          if (u.id === action.userID) {
            return {...u, followed: true}
          }
          return u
        }),*/
      }
    }
    case "UNFOLLOW": {
      return {
        ...state,
        users: updateObjectArray(state.users, action.userID, "id", {followed: false})
        /*users: state.users.map(u => {
          if (u.id === action.userID) {
            return {...u, followed: false}
          }
          return u
        }),*/
      }
    }
    case "SET-USERS": {
      return {
        ...state,
        users: action.users
      }
    }
    case "SET-CURRENT-PAGE": {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case "SET-PAGE-SIZE": {
      return {
        ...state,
        pageSize: action.pageSize
      }
    }
    case "SET-TOTAL-USERS-COUNT": {
      return {
        ...state,
        totalUsersCount: action.count
      }
    }
    case "TOGGLE-IS-FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case "FOLLOWING-IN-PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id !== action.userID)
      }
    }
    default:
      return state;
  }
}

export const followSuccess = (userID: string) => {
  return {type: "FOLLOW", userID: userID}
}
export const unfollowSuccess = (userID: string) => {
  return {type: "UNFOLLOW", userID: userID}
}
export const setUsers = (users: Array<UsersType>) => {
  return {type: "SET-USERS", users: users}
}
export const setCurrentPage = (currentPage: number) => {
  return {type: "SET-CURRENT-PAGE", currentPage: currentPage}
}
export const setPageSize = (pageSize: number) => {
  return {type: "SET-PAGE-SIZE", pageSize: pageSize}
}
export const setUsersTotalCount = (count: number) => {
  return {type: "SET-TOTAL-USERS-COUNT", count: count}
}
export const toggleIsFetching = (isFetching: boolean) => {
  return {type: "TOGGLE-IS-FETCHING", isFetching: isFetching}
}
export const followingInProgressAC = (isFetching: boolean, userID: string) => {
  return {type: "TOGGLE-IS-FETCHING", isFetching, userID}
}
export type FollowACType = {
  type: "FOLLOW", userID: string
}
export type UnfollowACType = {
  type: "UNFOLLOW", userID: string
}
export type SetUsersAC = {
  type: "SET-USERS", users: Array<UsersType>
}
export type SetCurrentPageAC = {
  type: "SET-CURRENT-PAGE", currentPage: number
}
export type SetPageSizeAC = {
  type: "SET-PAGE-SIZE", pageSize: number
}
export type SetUsersTotalCountAC = {
  type: "SET-TOTAL-USERS-COUNT", count: number
}
export type ToggleIsFetching = {
  type: "TOGGLE-IS-FETCHING", isFetching: boolean
}
export type FollowingInProgressAC = {
  type: "FOLLOWING-IN-PROGRESS", isFetching: boolean, userID: string
}
export type UsersActionType = FollowACType | UnfollowACType | SetUsersAC | SetPageSizeAC
  | SetCurrentPageAC | SetUsersTotalCountAC | ToggleIsFetching
  | FollowingInProgressAC

export const getUsersThunkCreator = (page: number, pageSize: number) => { // requestUsers у Димыча
  return async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  }
}

const followUnfollowFlow =
  async (dispatch: Dispatch, userID: string, apiMethod: any, actionCreator: any) => {
  dispatch(followingInProgressAC(true, userID));
  let response = await apiMethod(userID);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(followingInProgressAC(false, userID));
}

export const followThunkCreator = (userID: string) => {
  return async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}

export const unfollowThunkCreator = (userID: string) => {
  return async (dispatch: Dispatch) => {
    followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}


/*props.setUsersAC([{
            id: v1(),
            avatar: avatar,
            followed: true,
            name: "Dmitriy K.",
            status: "I am a boss",
            location: {city: "Minsk", country: "Belarus"}
          },
            {
              id: v1(),
              avatar: avatar,
              followed: true,
              name: "Sasha G.",
              status: "I am a student",
              location: {city: "Minsk", country: "Belarus"}
            },
            {
              id: v1(),
              avatar: avatar,
              followed: false,
              name: "Andrew P.",
              status: "I am a boss too",
              location: {city: "Kiev", country: "Ukraine"}
            }])*/