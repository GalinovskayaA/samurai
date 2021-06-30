import React, {ChangeEvent, KeyboardEvent} from "react";
import Message from "./Messege/Message";
import {DialogsContainerPropsType} from "./DialogsContainer";
import {TextareaFormType} from "../profile/MyPosts/MyPosts";
import {AddMessageReduxForm} from "../profile/MyPosts/Post/Textarea";


const DialogsMessages = (props: DialogsContainerPropsType) => {
  let message = props.newMessageBody
  const addNewMessage = (values: TextareaFormType) => {
    props.addSendMessageClick(values.textarea)
  }

  /*const onNewMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
     props.updateNewMessageCreator(e.currentTarget.value)
  }*/
  const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      props.addSendMessageClick(message);
    }
  }

  const messageElements = props.messageData.map ((m) => (<Message key={m.id} id={m.id} message={m.message}/>))

    return (
          <div>
            {/*<div><textarea value={message}
                           onChange={onNewMessageChange}
                           onKeyPress={onKeyPressHandler}
                           placeholder={'Enter your message'}> </textarea></div>
            <div><button onClick={ () => props.addSendMessageClick(message) }> add </button></div>*/}
            <AddMessageReduxForm onSubmit={addNewMessage} />
            <div> { messageElements } </div>
          </div>
    )
}

export default DialogsMessages;