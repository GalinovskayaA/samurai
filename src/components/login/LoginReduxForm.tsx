import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {InputFormsController} from "../common/FormsControls";
import {required} from "../../utils/validators/validators";
import {FormLoginDataType} from "./Login";
import s from "./../common/FormsControls.module.css"
import {useSelector} from "react-redux";
import {ForCreateFieldPropertiesType, StoreStateType} from "../../redux/redux-store";
import {createField} from "../../utils/createField";


const LoginForm: React.FC<InjectedFormProps<FormLoginDataType>> = ({handleSubmit, error}) => {
    const captchaUrl = useSelector<StoreStateType, string | null>(state => state.auth.captchaUrl)
    return <>
        <form onSubmit={handleSubmit}>
            <div>
                {createField<ForCreateFieldPropertiesType<FormLoginDataType>>("Email", "email", [required], InputFormsController)}
            </div>
            <div>
                {createField<ForCreateFieldPropertiesType<FormLoginDataType>>("Password", "password", [required], InputFormsController, {type: "password"})}
            </div>
            <div>
                {createField<ForCreateFieldPropertiesType<FormLoginDataType>>("", "rememberMe", [], InputFormsController, {type: "checkbox"}, 'remember me')}
            </div>
            {captchaUrl && <img src={captchaUrl} alt={'captcha'}/>}
            {captchaUrl && createField<ForCreateFieldPropertiesType<FormLoginDataType>>("Symbols from image", "captchaUrl", [required], InputFormsController)}
            {error && <div className={s.formSummaryError}> {error} </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    </>
}

export const LoginReduxForm = reduxForm<FormLoginDataType>({
    form: 'login'
})(LoginForm)