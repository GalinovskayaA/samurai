import React from 'react';
import classes from './Post.module.css';

export type MyPostsType = {
  id: string
  avatar: string
  message: string
  amount: number
}
export type PostsProps = {
  arrayMyPosts: Array<MyPostsType>
}

const Post = (props: PostsProps) => {
  const a = props.arrayMyPosts.map((p, index) => {
    return (
      <div key={index} className={classes.postsItem}>
        <img src={p.avatar} alt={''}/>
        {p.message}
        <div>
          <span> {p.amount} like</span>
        </div>
      </div>
    );
  })
  return (
    <div>
      {a}
    </div>
  );
}

export default Post;
