import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../redux/ProfileReducer";

export type ProfilePropsType = {
  isOwner: boolean
  savePhotoTC: (file: string) => void
  saveProfileTC: (profile: ProfileType) => void
}

export const Profile = ({isOwner, savePhotoTC, saveProfileTC}: ProfilePropsType) => {
  return <div>
    <ProfileInfo isOwner={isOwner} savePhotoTC={savePhotoTC} saveProfileTC={saveProfileTC}/>
    <MyPostsContainer />
  </div>
}

export default Profile;
