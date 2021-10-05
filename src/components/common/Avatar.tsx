import React from "react";


const Avatar = () => {
    let avatar = "https://cdn.pixabay.com/photo/2016/04/02/04/57/comic-1302161_1280.png"
    return <>
        <img src={avatar} alt={''} className="img-circle"/>
    </>
}

export default Avatar;