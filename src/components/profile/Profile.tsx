import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

export type ProfilePropsType = {
    isOwner: boolean
}

export const Profile = ({isOwner}: ProfilePropsType) => {
    return <>
        <ProfileInfo isOwner={isOwner}/>
    </>
}

export default Profile;
