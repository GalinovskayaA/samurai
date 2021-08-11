import {StoreStateType} from "./redux-store";
import {createSelector} from "reselect";

export const getUsersSelector = (state: StoreStateType) => {
    return state.usersPage.users
}
export const getUsersSuperSelector = createSelector(getUsersSelector, (users) => {
    return users.filter(() => true) // было user => true
})

export const getPageSizeSelector = (state: StoreStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCountSelector = (state: StoreStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPageSelector = (state: StoreStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetchingSelector = (state: StoreStateType) => {
    return state.usersPage.isFetching
}

export const getFilterSelector = (state: StoreStateType) => {
    return state.usersPage.filter
}

export const getFollowingInProgressSelector = (state: StoreStateType) => {
    return state.usersPage.followingInProgress
}