import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import s from "./../common/FormsControls.module.css"


const FormErrorMessage: React.FC<InjectedFormProps> = ({ error}) => {
  return <>
      { error && <div className={s.formSummaryError}> {error} </div> }
  </>
}

const Error = reduxForm<any>({
  form: 'error'
})(FormErrorMessage)

export default Error;
