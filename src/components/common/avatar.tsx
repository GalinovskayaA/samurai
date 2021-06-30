import React from "react";

type AvatarPropsType = {
  width: number,
  height?: number
}

const Avatar = ({width}: AvatarPropsType) => {
  let avatar = "https://cdn.pixabay.com/photo/2016/04/02/04/57/comic-1302161_1280.png"
   return <>
    <img src={avatar} alt={''} width={width}/>
  </>
}

export default Avatar;