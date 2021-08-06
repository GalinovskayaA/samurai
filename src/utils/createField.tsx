import {FieldValidatorType} from "./validators/validators";
import React, {FC} from "react";
import {Field, WrappedFieldProps} from "redux-form";


export function createField<T extends string>(placeholder: string | undefined,
                                              name: T,
                                              validators: Array<FieldValidatorType>,
                                              component: FC<WrappedFieldProps>,
                                              props = {},
                                              text = '') {
    return <>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}
    </>
}