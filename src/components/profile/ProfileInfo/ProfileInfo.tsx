import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import {ProfileType, savePhotoTC, saveProfileTC} from "../../../redux/ProfileReducer";
import Preloader from "../../common/preloader";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import Avatar from "../../common/avatar";
import {ProfilePropsType} from "../profile";
import {ProfileData} from "./ProfileData";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = ({isOwner}: ProfilePropsType) => {
    let dispatch = useDispatch()
    let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.SyntheticEvent<EventTarget>) => {
        const formInput = (e.target as HTMLFormElement).files;
        if (formInput.length) {
            dispatch(savePhotoTC(formInput[0]))
        }
    }

    const goToEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData: ProfileType) => {
        console.log(formData)
        dispatch(saveProfileTC(formData))
        setEditMode(false)
    }

    return <div>
        <div className={s.ava}>
            {profile.photos?.large ? <img src={profile.photos?.large} alt={''}/> : <Avatar width={250}/>}
            {isOwner && <input type="file" onChange={onMainPhotoSelected}/>}
            {editMode ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit}/> :
                <ProfileData isOwner={isOwner} goToEditMode={goToEditMode}/>}
        </div>
    </div>
}

export default ProfileInfo;