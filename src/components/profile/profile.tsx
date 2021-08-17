import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

export type ProfilePropsType = {
    isOwner: boolean
}

export const Profile = ({isOwner}: ProfilePropsType) => {
    return <div>
        <ProfileInfo isOwner={isOwner}/>
        <MyPostsContainer/>
    </div>
}

export default Profile;
