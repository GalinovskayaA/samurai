import React from "react";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {InputFormsController, TextareaFormsController} from "../../common/FormsControls";
import {useSelector} from "react-redux";
import {StoreStateType} from "../../../redux/redux-store";
import {ProfileType} from "../../../redux/ProfileReduser";
import s from "./ProfileInfo.module.css";

const ProfileDataForm: React.FC<InjectedFormProps> = ({handleSubmit, error}) => {
  let profile = useSelector<StoreStateType, ProfileType>(state => state.profilePage.profile)
  return <>
    <form onSubmit={handleSubmit}>
      <div> <button onClick={()=> {}}> save </button> </div>
      {error && <div className={s.formSummaryError}> {error} </div>}
      <div>
        <b>Full name:</b> <Field placeholder={'Full name'} name={'fullName'} component={InputFormsController}/>
      </div>
      <ProfileStatusWithHooks />
      <div>
        <b>Looking for a job:</b>
        <Field placeholder={''} name={'lookingForAJob'} component={InputFormsController} type="checkbox"/>
      </div>
      <div>
        <b>My professionals skills:</b>
        <Field placeholder={'My professionals skills'} name={'lookingForAJobDescription'} component={TextareaFormsController}/>
      </div>
      <div>
        <b>About me:</b>
        <Field placeholder={'About me'} name={'aboutMe'} component={TextareaFormsController}/>
      </div>
      { profile.contacts && <div>
        <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={s.contact}>
          <b>{key}: {<Field placeholder={key} name={'contacts.' + key} component={TextareaFormsController}/>}</b>
        </div>
      })}
      </div>}
    </form>
  </>
}

const ProfileDataFormReduxForm = reduxForm<any>({
  form: 'edit-profile'
})(ProfileDataForm)

export default ProfileDataFormReduxForm;

export const createField = (placeholder: string, name: string, validators: {}, component: any, props={}, text = "") => {
  return <div>
    <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}
  </div>
}

