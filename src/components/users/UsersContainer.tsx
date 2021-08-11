import React from "react";
import {connect} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
  followSuccessAC, getUsersTC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC, toggleIsFetchingAC,
  unfollowSuccessAC,
  UsersType, unfollowTC, followTC, setPageSizeAC, FilterType
} from "../../redux/UsersReducer";
import Users from "./Users";
import Preloader from "../common/preloader";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {
  getCurrentPageSelector, getFilterSelector, getFollowingInProgressSelector, getIsFetchingSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector, getUsersSuperSelector,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component<UsersContainerPropsType> {
  avatar = "https://cdn.pixabay.com/photo/2016/04/02/04/57/comic-1302161_1280.png"
  refreshUsers() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter);
  }

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, this.props.filter);
    this.props.setPageSize(this.props.pageSize)
    this.props.setCurrentPage(this.props.currentPage)
  }

  componentDidUpdate(prevProps: Readonly<UsersContainerPropsType>, prevState: Readonly<{}>) {
    if (this.props.currentPage !== prevProps.currentPage) {
      this.refreshUsers()
    }
  }

  onPageChanged = (currentPage: number) => {
    this.props.getUsersThunkCreator(currentPage, this.props.pageSize, this.props.filter);
  }

  onFilterChanged = (filter: FilterType) => {
    this.props.setCurrentPage(1)
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize, filter);
    this.refreshUsers()
  }


  render() {
    return <>
      <div>
        {this.props.isFetching ? <Preloader/> : null}
      </div>
      <Users onPageChanged={this.onPageChanged}
             onFilterChanged={this.onFilterChanged}
             followSuccess={this.props.followSuccess}
             unfollowSuccess={this.props.unfollowSuccess}
             currentPage={this.props.currentPage}
             pageSize={this.props.pageSize}
             totalUsersCount={this.props.totalUsersCount}
             users={this.props.users}
             isFetching={this.props.isFetching}
             setPageSize={this.props.setPageSize}
             filter={this.props.filter}
             followingInProgress={this.props.followingInProgress}
             followThunkCreator={this.props.followThunkCreator}
             unfollowThunkCreator={this.props.unfollowThunkCreator}/>
    </>
  }
}

type MapStatePropsType = {
  users: Array<UsersType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  filter: FilterType
  followingInProgress: Array<string>
}
type MapDispatchPropsType = {
  followSuccess: (usersID: string) => void,
  unfollowSuccess: (usersID: string) => void,
  setUsers: (users: Array<UsersType>) => void
  setCurrentPage: (currentPage: number) => void
  setPageSize: (pageSize: number) => void
  setUsersTotalCount: (count: number) => void
  toggleIsFetching: (isFetching: boolean) => void
  followThunkCreator: (userID: string) => void
  unfollowThunkCreator: (userID: string) => void
  getUsersThunkCreator: (currentPage: number, pageSize: number, filter: FilterType) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    filter: getFilterSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    followSuccess: followSuccessAC, unfollowSuccess: unfollowSuccessAC, setUsers: setUsersAC,
    setCurrentPage: setCurrentPageAC, setPageSize: setPageSizeAC, setUsersTotalCount: setUsersTotalCountAC, toggleIsFetching: toggleIsFetchingAC,
    followThunkCreator: followTC, unfollowThunkCreator: unfollowTC, getUsersThunkCreator: getUsersTC,
  }),
  withAuthRedirect
)(UsersContainer)
