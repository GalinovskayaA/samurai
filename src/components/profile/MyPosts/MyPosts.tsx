import React from 'react';
import s from './MyPosts.module.css';
import Post, {MyPostsType} from "./Post/Post";
import {AddMessageReduxForm} from "./Post/Textarea";


type MyPostsPropsType = {
  newMessage: string,
  arrayMyPosts: Array<MyPostsType>,
  addPostAC: (message: string)  => void,
  updateNewPostTextAC: (text: string) => void,
}
export type TextareaFormType = {
  textarea: string
}

const MyPosts = React.memo((props: MyPostsPropsType) => {

  const onAddPost = (value: TextareaFormType) => {
    if (value.textarea.trim() !== '') {
      props.addPostAC(value.textarea);
      value.textarea = ''
    }
  }

  return (
    <div className={s.MyPosts}>
      <h3>My posts</h3>
      <div>
        <AddMessageReduxForm onSubmit={onAddPost}/>
      </div>
      <div className={s.posts}>
        <Post arrayMyPosts={props.arrayMyPosts}/>
      </div>
    </div>
  );
});

export default MyPosts;




// class MyPosts extends React.PureComponent<MyPostsPropsType>  // приставка Pure- заменяет метод жизненного цикла
// shouldComponentUpdate (т.е. он прописан под копотом)

/*shouldComponentUpdate(nextProps: Readonly<MyPostsPropsType>, nextState: Readonly<{}>): boolean {
  return nextProps !== this.props || nextState !== this.state; // не надо перерисовываться если ничего не поменялось
}*/