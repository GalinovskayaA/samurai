import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {profileReducer} from "./ProfileReducer";
import {friendReducer} from "./FriendsReducer";
import {dialogsReducer} from "./DialogsReducer";
import {usersReducer} from "./UsersReducer";
import {authReducer} from "./AuthReducer";
import { reducer as formReducer } from 'redux-form';
import {appReducer} from "./AppReducer";
import chatReducer from "./ChatReducer";


export const rootReducer = combineReducers ({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  friendPage: friendReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer
});

export type RootReducerType = typeof rootReducer
export type StoreStateType = ReturnType<RootReducerType>

// типизация для actions
export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StoreStateType, unknown, A>

export type ForCreateFieldPropertiesType<T> = Extract<keyof T, string>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.store = store;

export default store;