import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";
import {updateObjectArray} from "../utils/objects-helper";
import {BaseThunkType} from "./redux-store";

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
        case 'SN/USERS/FOLLOW': {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID, "id", {followed: true})
            }
        }
        case 'SN/USERS/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID, "id", {followed: false})
            }
        }
        case 'SN/USERS/SET-USERS': {
            return {
                ...state,
                users: action.users
            }
        }
        case 'SN/USERS/SET-CURRENT-PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'SN/USERS/SET-PAGE-SIZE': {
            return {
                ...state,
                pageSize: action.pageSize
            }
        }
        case 'SN/USERS/SET-TOTAL-USERS-COUNT': {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case 'SN/USERS/TOGGLE-IS-FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'SN/USERS/FOLLOWING-IN-PROGRESS': {
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

// ----- Actions -----

export const followSuccessAC = (userID: string): FollowACType => {
    return {type: 'SN/USERS/FOLLOW', userID: userID}
}
export const unfollowSuccessAC = (userID: string): UnfollowACType => {
    return {type: 'SN/USERS/UNFOLLOW', userID: userID}
}
export const setUsersAC = (users: Array<UsersType>): SetUsersACType => {
    return {type: 'SN/USERS/SET-USERS', users: users}
}
export const setCurrentPageAC = (currentPage: number): SetCurrentPageACType => {
    return {type: 'SN/USERS/SET-CURRENT-PAGE', currentPage: currentPage}
}
export const setPageSizeAC = (pageSize: number): SetPageSizeACType => {
    return {type: 'SN/USERS/SET-PAGE-SIZE', pageSize: pageSize}
}
export const setUsersTotalCountAC = (count: number): SetUsersTotalCountACType => {
    return {type: 'SN/USERS/SET-TOTAL-USERS-COUNT', count: count}
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => {
    return {type: 'SN/USERS/TOGGLE-IS-FETCHING', isFetching: isFetching}
}
export const followingInProgressAC = (isFetching: boolean, userID: string): FollowingInProgressACType => {
    return {type: 'SN/USERS/FOLLOWING-IN-PROGRESS', isFetching, userID}
}

// ----- Thunk -----

export const getUsersTC = (page: number, pageSize: number): ThunkType => { // requestUsers у Димыча
    return async (dispatch) => {
        dispatch(toggleIsFetchingAC(true));
        dispatch(setCurrentPageAC(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetchingAC(false));
        dispatch(setUsersAC(data.items));
        dispatch(setUsersTotalCountAC(data.totalCount));
    }
}

export const followTC = (userID: string): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccessAC)
    }
}

export const unfollowTC = (userID: string): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccessAC)
    }
}

// ----- Helper -----

const _followUnfollowFlow =
    async (dispatch: Dispatch, userID: string, apiMethod: any, actionCreator: (userID: string) => FollowACType | UnfollowACType) => {
        dispatch(followingInProgressAC(true, userID));
        let response = await apiMethod(userID);
        if (response.data.resultCode === 0) {
            dispatch(actionCreator(userID))
        }
        dispatch(followingInProgressAC(false, userID));
    }

// ----- Types -----

export type UsersActionType = FollowACType | UnfollowACType | SetUsersACType |
                              SetPageSizeACType | SetCurrentPageACType | SetUsersTotalCountACType |
                              ToggleIsFetchingType | FollowingInProgressACType
type ThunkType = BaseThunkType<UsersActionType>

export type FollowACType = { type: 'SN/USERS/FOLLOW', userID: string }
export type UnfollowACType = { type: 'SN/USERS/UNFOLLOW', userID: string }
export type SetUsersACType = { type: 'SN/USERS/SET-USERS', users: Array<UsersType> }
export type SetCurrentPageACType = { type: 'SN/USERS/SET-CURRENT-PAGE', currentPage: number }
export type SetPageSizeACType = { type: 'SN/USERS/SET-PAGE-SIZE', pageSize: number }
export type SetUsersTotalCountACType = { type: 'SN/USERS/SET-TOTAL-USERS-COUNT', count: number }
export type ToggleIsFetchingType = { type: 'SN/USERS/TOGGLE-IS-FETCHING', isFetching: boolean }
export type FollowingInProgressACType = { type: 'SN/USERS/FOLLOWING-IN-PROGRESS', isFetching: boolean, userID: string }