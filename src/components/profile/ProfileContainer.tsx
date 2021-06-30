import React from 'react';
import {connect} from "react-redux";
import Profile from "./profile";
import {
  addPostAC, getUserProfileTC,
  MyPostsType,
  NetworkDataType,
  ProfileInfoDataType, ProfileType, setStatusTC,
  updateNewPostTextAC, updateStatusTC, userIsFetching
} from "../../redux/ProfileReduser";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Preloader from "../common/preloader";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {AuthPropsType} from "../../redux/AuthReduser";


class ProfileContainer extends React.Component<PropsType> {

  componentDidMount() {
   // this.props.userIsFetching(true);
    let meId = this.props.user.id;
    let userId = this.props.match.params.userId;
    console.log(this.props)
    console.log(userId)
    if (!userId) {
     userId = meId.toString() // !!! что это за переменная ???
    }
   this.props.getUserProfileTC(userId);
   this.props.setStatusTC(userId)
  }

  render() {
    let preloader =
      this.props.isFetching ? <Preloader /> : null

    return (<>
      <div>
        { preloader }
      </div>
      <Profile/>
    </>)
  }
}

type UserIdType = {
  userId: string,
}
type MapStatePropsType = {
  user: AuthPropsType,
  newMessage: string,
  networkData: NetworkDataType,
  profileInfoData: ProfileInfoDataType,
  arrayMyPosts: Array<MyPostsType>,
  profile: ProfileType
  isFetching: boolean
  status: string
}
type MapDispatchPropsType = {
  addPostAC: (message: string)  => void
  updateNewPostTextAC: (text: string) => void
  getUserProfileTC: (userId: string) => void
  setStatusTC: (userId: string) => void
  updateStatusTC: (status: string) => void
  /*setUserProfileAC: (profile: ProfileType) => void*/
  userIsFetching: (isFetching: boolean) => void
}
export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<UserIdType> & ProfileContainerPropsType & AuthPropsType

const mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    user: state.auth,
    newMessage: state.profilePage.newMessage,
    networkData: state.profilePage.networkData,
    profileInfoData: state.profilePage.profileInfoData,
    arrayMyPosts: state.profilePage.arrayMyPosts,
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching,
    status: state.profilePage.status
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {addPostAC, updateNewPostTextAC, getUserProfileTC, userIsFetching, setStatusTC, updateStatusTC}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
