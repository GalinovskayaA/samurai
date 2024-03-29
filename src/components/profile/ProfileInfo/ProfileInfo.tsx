import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import {ProfileType, savePhotoTC, saveProfileTC} from "../../../redux/ProfileReducer";
import Preloader from "../../common/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import Avatar from "../../common/Avatar";
import {ProfilePropsType} from "../Profile";
import {ProfileData} from "./ProfileData";
import ProfileDataFormReduxForm from "./ProfileDataForm";


const ProfileInfo = ({isOwner}: ProfilePropsType) => {
    const dispatch = useDispatch()
    const profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)

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
        dispatch(saveProfileTC(formData))
        setEditMode(false)
    }

    return <div>
        <div className={`col ${s.ava}`}>
            {profile.photos?.large ? <img src={profile.photos?.large} alt={''} className="img-circle large"/> : <Avatar />}
            {isOwner && <input type="file" onChange={onMainPhotoSelected} className={s.selectInput}/>}
            {editMode ? <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit}/> :
                <ProfileData isOwner={isOwner} goToEditMode={goToEditMode}/>}
        </div>
    </div>
}

export default ProfileInfo;