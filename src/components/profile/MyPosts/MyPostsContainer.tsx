import {MyPostsType} from "./Post/Post";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {
  addPostAC, getUserProfileTC,
  NetworkDataType,
  ProfileInfoDataType,
  ProfileType,
  updateNewPostTextAC, userIsFetchingAC,
} from "../../../redux/ProfileReducer";
import {StoreStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
  newMessage: string,
  networkData: NetworkDataType,
  profileInfoData: ProfileInfoDataType,
  arrayMyPosts: Array<MyPostsType>,
  profile: ProfileType,
  isFetching: boolean
}

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    newMessage: state.profilePage.newMessage,
    networkData: state.profilePage.networkData,
    profileInfoData: state.profilePage.profileInfoData,
    arrayMyPosts: state.profilePage.arrayMyPosts,
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching
  }
}

const MyPostsContainer = connect(mapStateToProps, {
  addPostAC,
  updateNewPostTextAC,
  getUserProfileTC,
  userIsFetchingAC
})(MyPosts);

export default MyPostsContainer;