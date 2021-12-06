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
        <Error/>
        <div className={`border-b padding-s-tb`}>
            <h2>Full name:</h2> {profile.fullName}
        </div>
        <ProfileStatusWithHooks/>
        <div className={`border-b padding-s-tb`}>
            <h2>My professionals skills:</h2> {profile.lookingForAJobDescription}
        </div>
        <div className={`border-b padding-s-tb`}>
            <h2>About me:</h2> {profile.aboutMe}
        </div>
        {profile.contacts && <div>
            <h2>Contacts:</h2> {Object.keys(profile.contacts).filter(i => profile.contacts[i]).map(key => {
               return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>}
        {isOwner && <div className={`offset-t`}>
          <button onClick={() => {
              goToEditMode()
          }}> edit
          </button>
        </div>}
    </>
}