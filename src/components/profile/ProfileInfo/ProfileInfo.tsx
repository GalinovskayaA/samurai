import React from "react";
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/ProfileReduser";
import Preloader from "../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import Avatar from "../../common/avatar";
import {ProfilePropsType} from "../profile";



const ProfileInfo = ({isOwner, savePhotoTC}: ProfilePropsType) => {
  let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: React.SyntheticEvent<EventTarget>) => {
    const formInput = (e.target as HTMLFormElement).files;
    if (formInput.length) {
      savePhotoTC(formInput[0])
    }
  }

  return <div>
    <div className={s.ava}>
      {<img src={profile.photos?.large} alt={''}/> || <Avatar width={250}/>}
      {console.log(profile.photos?.large)}
      {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
      <ProfileStatusWithHooks />
    </div>
  </div>
}

export default ProfileInfo;