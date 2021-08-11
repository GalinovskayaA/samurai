import React from 'react';
import {connect} from "react-redux";
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
import {RouteComponentProps, withRouter} from 'react-router-dom';
import Preloader from "../common/preloader";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {AuthPropsType} from "../../redux/AuthReducer";


class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let meId = this.props.user.id;
        let userId = this.props.match.params.userId; // благодаря withRouter, который законектил к URL, взялись
        console.log(this.props)                      // данные из match
        console.log(userId)
        if (!userId) {
            userId = meId.toString()
        }
        this.props.getUserProfileTC(userId);
        this.props.setStatusTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        let preloader =
            this.props.isFetching ? <Preloader/> : null

        return (<>
            <div>
                {preloader}
            </div>
            <Profile isOwner={!this.props.match.params.userId}
                     savePhotoTC={this.props.savePhotoTC}
                     saveProfileTC={this.props.saveProfileTC}/>
        </>)
    }
}

type UserIdType = {
    userId: string,
}
type MapStatePropsType = {
    user: AuthPropsType,
    newMessage: string,
    networkData: NetworkDataType,
    profileInfoData: ProfileInfoDataType,
    arrayMyPosts: Array<MyPostsType>,
    profile: ProfileType
    isFetching: boolean
    status: string
}
type MapDispatchPropsType = {
    addPostAC: (message: string) => void
    updateNewPostTextAC: (text: string) => void
    getUserProfileTC: (userId: string) => void
    setStatusTC: (userId: string) => void
    updateStatusTC: (status: string) => void
    userIsFetching: (isFetching: boolean) => void
    savePhotoTC: (file: string) => void
    saveProfileTC: (profile: ProfileType) => void
}
export type ProfileContainerPropsType = MapStatePropsType & MapDispatchPropsType
type PropsType = RouteComponentProps<UserIdType> & ProfileContainerPropsType & AuthPropsType

const mapStateToProps = (state: StoreStateType): MapStatePropsType => {
    return {
        user: state.auth,
        newMessage: state.profilePage.newMessage,
        networkData: state.profilePage.networkData,
        profileInfoData: state.profilePage.profileInfoData,
        arrayMyPosts: state.profilePage.arrayMyPosts,
        profile: state.profilePage.profile,
        isFetching: state.profilePage.isFetching,
        status: state.profilePage.status
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        addPostAC,
        updateNewPostTextAC,
        getUserProfileTC,
        userIsFetching: userIsFetchingAC,
        setStatusTC,
        updateStatusTC,
        savePhotoTC,
        saveProfileTC
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
