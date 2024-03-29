import {v1} from "uuid";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType} from "./redux-store";
import {stopSubmit} from "redux-form";


export type NetworkDataType = {
    logo: string,
    background: string,
    navBar: string
}
export type ProfileInfoDataType = {
    content: string,
    backgroundImg: string
}
export type MyPostsType = {
    id: string,
    avatar: string,
    message: string,
    amount: number
}
export type ContactsUserProfileType = {
    facebook?: null | string,
    website?: null | string,
    vk?: null | string,
    twitter?: null | string,
    instagram?: null | string,
    youtube?: null | string,
    github?: null | string,
    mainLink?: null | string,
}
export type PhotosUserProfileType = {
    small: string,
    large: string
}
export type ProfileType = {
    aboutMe: string,
    contacts: { [key: string]: string },
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    userId: string,
    photos: PhotosUserProfileType
}
export type ProfilePageType = {
    newMessage: string,
    networkData: NetworkDataType,
    profileInfoData: ProfileInfoDataType,
    arrayMyPosts: Array<MyPostsType>,
    profile: ProfileType,
    isFetching: boolean,
    status: string
}

const initialState: ProfilePageType = {
    newMessage: 'BlaBlaBla',
    networkData: {
        logo: "https://cdn.clipart.email/99a9bc01980d179473c824e6ded69513_download-guild-wars-2-logo-png-jpg-stock-guild-wars-2-cd-key-_1697-1751.png",
        background: "https://junior3d.ru/texture/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B%D0%9B%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0_62.jpg",
        navBar: ""
    } as NetworkDataType,
    profileInfoData: {
        content: "Ava + Description",
        backgroundImg: "https://junior3d.ru/texture/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D0%B0/%D0%9F%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B%D0%9B%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0/%D0%BF%D0%B0%D0%BD%D0%BE%D1%80%D0%B0%D0%BC%D1%8B-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%D0%B0_62.jpg",
    } as ProfileInfoDataType,
    arrayMyPosts: [
        {
            id: v1(),
            avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
            message: "Hi",
            amount: 5
        },
        {
            id: v1(),
            avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
            message: "How are you?",
            amount: 3
        },
        {
            id: v1(),
            avatar: "https://www.anypics.ru/download.php?file=201210/1440x900/anypics.ru-5910.jpg",
            message: "Fine",
            amount: 4
        },
    ] as Array<MyPostsType>,
    profile: {} as ProfileType,
    isFetching: true,
    status: "",
}

// = ReturnType<typeof addPostAC> но тогда
// в функции не надо указывать тип,
// который он возвращает

export const profileReducer = (state = initialState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST': {
            return {
                ...state,
                arrayMyPosts: [{id: v1(), avatar: "", message: action.message, amount: 0}, ...state.arrayMyPosts],
                newMessage: "",
            };
        }
        case 'SN/PROFILE/DELETE-POST': {
            return {
                ...state,
                arrayMyPosts: state.arrayMyPosts.filter(p => p.id !== action.id)
            };
        }
        case 'SN/PROFILE/UPDATE-NEW-MESSAGE': {
            return {
                ...state,
                newMessage: action.newMessage
            };
        }
        case 'SN/PROFILE/SET-USER-PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'SN/PROFILE/USER-IS-FETCHING': { // у Димыча этой функции нет
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'SN/PROFILE/SET-STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'SN/PROFILE/SET-SAVE-PHOTO': {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

// ----- Actions -----

export const addPostAC = (message: string): AddPostType => {
    return {type: 'SN/PROFILE/ADD-POST', message: message} as const
}
export const deletePostAC = (id: string): DeletePostType => {
    return {type: 'SN/PROFILE/DELETE-POST', id: id} as const
}
export const updateNewPostTextAC = (message: string): UpdateNewPostTextActionCreatorType => {
    return {type: 'SN/PROFILE/UPDATE-NEW-MESSAGE', newMessage: message} as const
}
export const setUserProfileAC = (profile: ProfileType): UserProfile => {
    return {type: 'SN/PROFILE/SET-USER-PROFILE', profile: profile} as const
}
export const userIsFetchingAC = (isFetching: boolean): UserIsFetching => {
    return {type: 'SN/PROFILE/USER-IS-FETCHING', isFetching: isFetching} as const
}
export const setStatusAC = (status: string): SetStatusType => {
    return {type: 'SN/PROFILE/SET-STATUS', status: status} as const
}
export const setSavePhotoAC = (photos: PhotosUserProfileType): SetSavePhoto => {
    return {type: 'SN/PROFILE/SET-SAVE-PHOTO', photos: photos} as const
}

// ----- Thunk -----

export const getUserProfileTC = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(setUserProfileAC(response.data));
    dispatch(userIsFetchingAC(false)); //можно удалить)
}
export const setStatusTC = (userId: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatusAC(response.data));
}
export const updateStatusTC = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatusAC(status));
        dispatch(userIsFetchingAC(false)); //можно удалить)
    }
}
export const savePhotoTC = (file: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setSavePhotoAC(response.data.data.photos));
    }
}
export const saveProfileTC = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id.toString()
    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfileAC(profile))
        await dispatch(getUserProfileTC(userId))
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('error', {_error: message})); // через специальную форму 'error'
        return Promise.reject(message)
        //dispatch(stopSubmit('edit-profile', {"contacts": {"facebook": response.data.messages[0]}})); // ошибка будет под определенной текстерией
        //alert(response.data.messages[0])
    }
}

// ----- Types -----

export type ProfileActionType = AddPostType | DeletePostType | UpdateNewPostTextActionCreatorType |
                                UserProfile | UserIsFetching | SetStatusType |
                                SetSavePhoto
type ThunkType = BaseThunkType<ProfileActionType | ReturnType<typeof stopSubmit>>

export type AddPostType = { type: 'SN/PROFILE/ADD-POST', message: string }
export type DeletePostType = { type: 'SN/PROFILE/DELETE-POST', id: string }
export type UpdateNewPostTextActionCreatorType = { type: 'SN/PROFILE/UPDATE-NEW-MESSAGE', newMessage: string }
export type UserProfile = { type: 'SN/PROFILE/SET-USER-PROFILE', profile: ProfileType }
export type UserIsFetching = { type: 'SN/PROFILE/USER-IS-FETCHING', isFetching: boolean }
export type SetStatusType = { type: 'SN/PROFILE/SET-STATUS', status: string }
export type SetSavePhoto = { type: 'SN/PROFILE/SET-SAVE-PHOTO', photos: PhotosUserProfileType }

