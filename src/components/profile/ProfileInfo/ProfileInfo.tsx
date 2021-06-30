import React from "react";
import s from './ProfileInfo.module.css';
import {ProfileType} from "../../../redux/ProfileReduser";
import Preloader from "../../common/preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import Avatar from "../../common/avatar";


const ProfileInfo = () => {
  let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
  if (!profile) {
    return <Preloader />
  }

  return <div>
    <div className={s.ava}>
      {<img src={profile.photos?.large} alt={''}/> && <Avatar width={250}/>}
      <ProfileStatusWithHooks />
    </div>
  </div>
}

export default ProfileInfo;