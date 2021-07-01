import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

export type ProfilePropsType = {
  isOwner: boolean
  savePhotoTC: (file: string) => void
}

export const Profile = ({isOwner, savePhotoTC}: ProfilePropsType) => {
  return <div>
    <ProfileInfo isOwner={isOwner} savePhotoTC={savePhotoTC}/>
    <MyPostsContainer />
  </div>
}

export default Profile;
