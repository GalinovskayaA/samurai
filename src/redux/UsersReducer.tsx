import {Dispatch} from "redux";
import {usersAPI} from "../api/api";
import {updateObjectArray} from "../utils/objects-helper";
import {ThunkAction} from "redux-thunk";
import {StoreStateType} from "./redux-store";

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

export const usersReducer = (state = initialState, action: UsersActionType): UsersPropsType => {
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

export const followSuccess = (userID: string): FollowACType => {
  return {type: "FOLLOW", userID: userID}
}
export const unfollowSuccess = (userID: string): UnfollowACType => {
  return {type: "UNFOLLOW", userID: userID}
}
export const setUsers = (users: Array<UsersType>): SetUsersAC => {
  return {type: "SET-USERS", users: users}
}
export const setCurrentPage = (currentPage: number): SetCurrentPageAC => {
  return {type: "SET-CURRENT-PAGE", currentPage: currentPage}
}
export const setPageSize = (pageSize: number): SetPageSizeAC => {
  return {type: "SET-PAGE-SIZE", pageSize: pageSize}
}
export const setUsersTotalCount = (count: number): SetUsersTotalCountAC => {
  return {type: "SET-TOTAL-USERS-COUNT", count: count}
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetching => {
  return {type: "TOGGLE-IS-FETCHING", isFetching: isFetching}
}
export const followingInProgressAC = (isFetching: boolean, userID: string): FollowingInProgressAC => {
  return {type: "FOLLOWING-IN-PROGRESS", isFetching, userID}
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
type ThunkType = ThunkAction<Promise<void>, StoreStateType, unknown, UsersActionType>

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => { // requestUsers у Димыча
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setUsersTotalCount(data.totalCount));
  }
}

const _followUnfollowFlow =
  async (dispatch: Dispatch, userID: string, apiMethod: any, actionCreator: (userID: string) => FollowACType | UnfollowACType) => {
  dispatch(followingInProgressAC(true, userID));
  let response = await apiMethod(userID);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(followingInProgressAC(false, userID));
}

export const followThunkCreator = (userID: string): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}

export const unfollowThunkCreator = (userID: string): ThunkType => {
  return async (dispatch) => {
    await _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}