import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {InputFormsController} from "../common/FormsControls";
import {required} from "../../utils/validators/validators";
import {FormDataType} from "./Login";
import s from "./../common/FormsControls.module.css"

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = ({handleSubmit, error}) => {
  return <>
    <form onSubmit={handleSubmit}>
      <div>
        <Field placeholder={"Email"} name={"email"} component={InputFormsController}
               validate={[required]}/>
      </div>
      <div>
        <Field placeholder={"Password"} name={"password"} type={"password"} component={InputFormsController}
               validate={[required]}/>
      </div>
      <div>
        <Field type={"checkbox"} name={"remember me"} component={InputFormsController}/>
        remember me
      </div>
      { error && <div className={s.formSummaryError}> {error} </div> }
      <div>
        <button>Login</button>
      </div>
    </form>
  </>
}
export const LoginReduxForm = reduxForm<FormDataType>({
  form: 'login'
})(LoginForm)