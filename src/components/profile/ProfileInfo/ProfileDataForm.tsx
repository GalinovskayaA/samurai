import React from 'react'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import {InjectedFormProps, reduxForm} from 'redux-form'
import {InputFormsController, TextareaFormsController} from '../../common/FormsControls'
import {useSelector} from 'react-redux'
import {ForCreateFieldPropertiesType, StoreStateType} from '../../../redux/redux-store'
import {ProfileType} from '../../../redux/ProfileReducer'
import s from './ProfileInfo.module.css'
import {createField} from "../../../utils/createField";


const ProfileDataForm: React.FC<InjectedFormProps<ProfileType>> = ({handleSubmit, error}) => {
    let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
    return <>
        <form onSubmit={handleSubmit}>
            {error && <div className={s.formSummaryError}> {error} </div>}
            <div>
                <b>Full name:</b>
                {createField<ForCreateFieldPropertiesType<ProfileType>>('Full name', "fullName", [], InputFormsController)}
            </div>
            <ProfileStatusWithHooks/>
            <div>
                <b>Looking for a job:</b>
                {createField<ForCreateFieldPropertiesType<ProfileType>>('', "lookingForAJob", [], InputFormsController, {type: "checkbox"})}
            </div>
            <div>
                <b>My professionals skills:</b>
                {createField<ForCreateFieldPropertiesType<ProfileType>>('My professionals skills', "lookingForAJobDescription", [], TextareaFormsController)}
            </div>
            <div>
                <b>About me:</b>
                {createField<ForCreateFieldPropertiesType<ProfileType>>('About me', "aboutMe", [], TextareaFormsController)}
            </div>
            {profile.contacts && <div>
              <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={s.contact}>
                    <b>{key}: {createField(key, 'contacts.' + key, [], TextareaFormsController)}</b>
                </div>
            })}
            </div>}
            <div className={`offset-t`}>
                <button> save </button>
            </div>
        </form>
    </>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType>({
    form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm

