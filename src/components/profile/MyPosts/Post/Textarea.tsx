import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {TextareaFormType} from "../MyPosts";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {TextareaFormsController} from "../../../common/FormsControls";
import {createField} from "../../../../utils/createField";
import {ForCreateFieldPropertiesType} from "../../../../redux/redux-store";


const maxLength50 = maxLengthCreator(50)

const AddMessageForm: React.FC<InjectedFormProps<TextareaFormType>> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<ForCreateFieldPropertiesType<TextareaFormType>>('Enter your message', "textarea", [required, maxLength50], TextareaFormsController)}
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