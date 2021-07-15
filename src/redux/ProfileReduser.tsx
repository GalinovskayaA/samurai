import {v1} from "uuid";
import {Dispatch} from "redux";
import {profileAPI} from "../api/api";
import {StoreStateType} from "./redux-store";
import {stopSubmit} from "redux-form";
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE-POST';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const USER_IS_FETCHING = 'USER-IS-FETCHING'; // у Димыча этого нет
const SET_STATUS = 'SET-STATUS';
const SET_SAVE_PHOTO = 'SET-SAVE-PHOTO';

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
 /* facebook?: any,
  website?: any,
  vk?: any,
  twitter?: any,
  instagram?: any
  youtube?: any
  github?: any
  mainLink?: any*/
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
  contacts: {[key: string]: string}/*{[key: string]: any}*/,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  userId: string,
  photos: PhotosUserProfileType | null
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
        content: "Ava + Discription",
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

export type UpdateNewPostTextActionCreatorType = { // = ReturnType<typeof addPostAC> но тогда
  type: 'UPDATE-NEW-MESSAGE',                      // в функции не надо указывать тип,
  newMessage: string,                              // который он возвращает
  message: string,
}
export type AddPostType = { type: 'ADD-POST', message: string }
export type DeletePostType = { type: 'DELETE-POST', id: string }
export type UserProfile = { type: 'SET-USER-PROFILE', profile: ProfileType }
export type UserIsFetching = { type: 'USER-IS-FETCHING', isFetching: boolean }
export type SetStatusType = { type: 'SET-STATUS', status: string }
export type SetSavePhoto = { type: 'SET-SAVE-PHOTO', photos: PhotosUserProfileType }

export type ProfileActionType = UpdateNewPostTextActionCreatorType | AddPostType | DeletePostType
                                | UserProfile | UserIsFetching | SetStatusType
                                | SetSavePhoto

export const addPostAC = (message: string)  => {
  return { type: 'ADD-POST', message: message } as const
}
export const deletePostAC = (id: string)  => {
  return { type: 'DELETE-POST', id: id } as const
}
export const updateNewPostTextAC = (message: string)  => {
  return { type: 'UPDATE-NEW-MESSAGE', message: message } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
  return { type: 'SET-USER-PROFILE', profile: profile } as const
}
export const userIsFetching = (isFetching: boolean) => {
  return { type: 'USER-IS-FETCHING', isFetching: isFetching } as const
}
export const setStatusAC = (status: string) => {
  return { type: 'SET-STATUS', status: status } as const
}
export const setSavePhotoAC = (photos: PhotosUserProfileType) => {
  return { type: 'SET-SAVE-PHOTO', photos: photos } as const
}

export const profileReduser = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        arrayMyPosts: [{id: v1(), avatar: "", message: action.message, amount: 0}, ...state.arrayMyPosts],
        newMessage: "",
      };
    }
    /*return {...state, arrayMyPosts: [newPost, ...state.arrayMyPosts], message: ""};*/
    case DELETE_POST: {
      return {
        ...state,
        arrayMyPosts: state.arrayMyPosts.filter(p => p.id !== action.id)
      };
    }
    case UPDATE_NEW_MESSAGE: {
      return {
        ...state,
        newMessage: action.message
      };
    }
    case SET_USER_PROFILE: {
      return {...state, profile: action.profile}
    }
    case USER_IS_FETCHING: { // у Димыча этой функции нет
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case SET_SAVE_PHOTO: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    default:
      return state;
  }
}

export const getUserProfileTC = (userId: string) => async (dispatch: Dispatch) => {
  let response = await profileAPI.getProfile(userId);
//this.props.userIsFetching(false); на удаление
  dispatch(setUserProfileAC(response.data));
}
export const setStatusTC = (userId: string) => async (dispatch: Dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatusAC(response.data));
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatusAC(status));
  }
}
export const savePhotoTC = (file: string) => async (dispatch: Dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(setSavePhotoAC(response.data.data.photos));
  }
}
export const saveProfileTC = (profile: ProfileType) => async (dispatch: Dispatch, getState: () => StoreStateType) => {
  const userId = getState().auth.id
  let response = await profileAPI.saveProfileTC(profile);
  if (response.data.resultCode === 0) {
    dispatch(setUserProfileAC(profile))
    // @ts-ignore
    dispatch(getUserProfileTC(userId))
  } else {
    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
    dispatch(stopSubmit('error', {_error: message})); // через специальную форму 'error'
    return Promise.reject(message)
    //dispatch(stopSubmit('edit-profile', {"contacts": {"facebook": response.data.messages[0]}})); // ошибка будет под определенной текстерией
    //alert(response.data.messages[0])
  }
}


