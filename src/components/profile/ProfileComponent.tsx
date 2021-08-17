import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import Profile from "./profile";
import {
    addPostAC, getUserProfileTC,
    MyPostsType,
    NetworkDataType,
    ProfileInfoDataType, ProfileType, savePhotoTC, saveProfileTC, setStatusTC,
    updateNewPostTextAC, updateStatusTC, userIsFetchingAC
} from "../../redux/ProfileReducer";
import {StoreStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {RouteComponentProps, withRouter, useParams, Redirect} from 'react-router-dom';
import Preloader from "../common/preloader";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {AuthPropsType} from "../../redux/AuthReducer";


export const ProfileComponent = () => {
    let dispatch = useDispatch()
    const user = useSelector<StoreStateType, AuthPropsType>(state => state.auth)
    const {
        newMessage,
        networkData,
        profileInfoData,
        arrayMyPosts,
        profile,
        isFetching,
        status
    } = useSelector((state: StoreStateType) => state.profilePage)
    let {userId} = useParams<{ userId?: string | undefined }>()

    useEffect(() => {
        const meId = user.id
        console.log(userId)
        if (!userId) {
            userId = meId.toString()
        }
        dispatch(getUserProfileTC(userId))
        dispatch(setStatusTC(userId))
    }, [dispatch, userId, user])

    if (!user.isAuth) return <Redirect to={'/login'}/>
    return (
        <>
            <div>{isFetching && <Preloader/>}</div>
            <Profile isOwner={!userId}/>
        </>
    )
}