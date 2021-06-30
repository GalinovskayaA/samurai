import React, {ChangeEvent, KeyboardEvent} from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextareaFormType} from "../MyPosts";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {TextereaFormsController} from "../../../common/FormsControls";

const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<TextareaFormType>> = (props) => {

  return (
    <form onSubmit={props.handleSubmit} >
      <div>
        <Field name={"textarea"} component={TextereaFormsController} autoFocus placeholder={'Enter your message'} validate={[required, maxLength50]}/>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}
export const AddMessageReduxForm = reduxForm<TextareaFormType>({
  form: 'textarea'
})(AddMessageForm)