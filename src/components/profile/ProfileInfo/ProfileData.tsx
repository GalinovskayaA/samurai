import {useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../redux/ProfileReducer";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {Contacts} from "./Contacts";
import React from "react";
import Error from "../../common/FormErrorMessage";

type ProfileDataFormPropsType = {
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData = ({isOwner, goToEditMode}: ProfileDataFormPropsType) => {
    let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
    return <>
        {isOwner && <div>
          <button onClick={() => {
              goToEditMode()
          }}> edit
          </button>
        </div>}
        <Error/>
        <div>
            <b>Full name:</b> {profile.fullName}
        </div>
        <ProfileStatusWithHooks/>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
          <b>My professionals skills:</b> {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        {profile.contacts && <div>
          <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>}
    </>
}