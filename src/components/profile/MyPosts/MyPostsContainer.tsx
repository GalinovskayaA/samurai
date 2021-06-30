import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import classes from './MyPosts.module.css';
import Post, {MyPostsType} from "./Post/Post";
import StoreContext from "../../../StoreContext";
import {Dispatch, Store} from "redux";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";
import {
  addPostAC, getUserProfileTC,
  NetworkDataType,
  ProfileInfoDataType,
  ProfileType, setUserProfileAC,
  updateNewPostTextAC, userIsFetching
} from "../../../redux/ProfileReduser";
import {StoreStateType} from "../../../redux/redux-store";


/*const MyPostsContainer = (props: MyPostsPropsType) => {

  let [message, setMessage] = useState(props.newMessage)
  let [arrayMyPosts, setArrayMyPosts] = useState(props.arrayMyPosts);

  const addPost = () => {
    if (message.trim() !== "") {
      store.dispatch(updateNewPostTextActionCreator(message))
      setMessage('')
      setArrayMyPosts(props.arrayMyPosts)
    }
  }


  return (
    <StoreContext.Consumer>
      { (store) => {
        return (
          <MyPosts addPost={addPost}
                        arrayMyPosts={props.arrayMyPosts}
                        newMessage={props.newMessage}/>
                        )
      }
    }
    </StoreContext.Consumer>
  );
}*/

type MapStatePropsType = {
  newMessage: string,
  networkData: NetworkDataType,
  profileInfoData: ProfileInfoDataType,
  arrayMyPosts: Array<MyPostsType>,
  profile: ProfileType,
  isFetching: boolean
}
type MapDispatchPropsType = {
  addPostAC: (message: string)  => void
  updateNewPostTextAC: (text: string) => void
  getUserProfileTC: (userId: number) => void
  userIsFetching: (isFetching: boolean) => void
}
type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType

let mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  console.log(state)
  return {
    newMessage: state.profilePage.newMessage,
    networkData: state.profilePage.networkData,
    profileInfoData: state.profilePage.profileInfoData,
    arrayMyPosts: state.profilePage.arrayMyPosts,
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching
  }
}
/*let mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    addPostAC: (message: string) => {
      dispatch(addPostAC(message))
    },
    updateNewPostTextAC: (message: string) => {
      dispatch(updateNewPostTextAC(message))
    }
  }
}*/

const MyPostsContainer = connect(mapStateToProps, {
  addPostAC,
  updateNewPostTextAC,
  getUserProfileTC,
  /*setUserProfileAC,*/
  userIsFetching
})(MyPosts);

export default MyPostsContainer;
