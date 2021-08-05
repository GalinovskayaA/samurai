import React from "react";
import {connect} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {
  followSuccess, getUsersThunkCreator,
  setCurrentPage,
  setUsers,
  setUsersTotalCount, toggleIsFetching,
  unfollowSuccess,
  UsersType, unfollowThunkCreator, followThunkCreator, setPageSize
} from "../../redux/UsersReducer";
import Users from "./Users";
import Preloader from "../common/preloader";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {
  getCurrentPageSelector, getFollowingInProgressSelector, getIsFetchingSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector, getUsersSuperSelector,
} from "../../redux/users-selectors";
import Select from "../common/paginator/Select";

class UsersContainer extends React.Component<UsersContainerPropsType> {
  avatar = "https://cdn.pixabay.com/photo/2016/04/02/04/57/comic-1302161_1280.png"

  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    this.props.setPageSize(this.props.pageSize)
  }

  onPageChanged = (currentPage: number) => {
    this.props.getUsersThunkCreator(currentPage, this.props.pageSize);
  }


  render() {
    return <>
      <div>
        {this.props.isFetching ? <Preloader/> : null}
      </div>
      <Select/>
      <Users onPageChanged={this.onPageChanged}
             followSuccess={this.props.followSuccess}
             unfollowSuccess={this.props.unfollowSuccess}
             currentPage={this.props.currentPage}
             pageSize={this.props.pageSize}
             totalUsersCount={this.props.totalUsersCount}
             users={this.props.users}
             isFetching={this.props.isFetching}
             setPageSize={this.props.setPageSize}
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
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}
export type UsersContainerPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    users: getUsersSuperSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    followSuccess, unfollowSuccess, setUsers,
    setCurrentPage, setPageSize, setUsersTotalCount, toggleIsFetching,
    followThunkCreator, unfollowThunkCreator, getUsersThunkCreator,
  }),
  withAuthRedirect
)(UsersContainer)
