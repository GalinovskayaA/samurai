import React from "react"
import s from "./FormsControls.module.css"
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"

type MetaType = {
  meta: WrappedFieldMetaProps
}


export const TextareaFormsController: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormsController {...props}><textarea {...props.input} {...restProps}/></FormsController>
}
export const InputFormsController: React.FC<WrappedFieldProps> = (props) => {
  const {input, meta, children, ...restProps} = props;
  return <FormsController {...props}><input {...props.input} {...restProps}/></FormsController>
}

const FormsController: React.FC<MetaType> = (
  {
    meta: {touched, error}, children
  }) => {
  const hasError = touched && error
  return (
    <div className={s.formControl + " " + (hasError ? s.error : '')}>
      <div>
        {children}
      </div>
      {hasError && <span> {error} </span>}
    </div>
  )
}

