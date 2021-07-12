import React from "react";
import s from "./FormsControls.module.css"

type MetaType = {
  meta: {
    touched: boolean,
    error: string
  }
}

export const TextareaFormsController = (props: any) => {
  const {input, meta, children, ...restProps} = props;
  return <FormsController {...props}><textarea {...props.input} {...restProps}/></FormsController>
}
export const InputFormsController = (props: any) => {
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

