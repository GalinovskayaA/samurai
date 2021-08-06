import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {profileReducer} from "./ProfileReducer";
import {friendReducer} from "./FriendsReducer";
import {dialogsReducer} from "./DialogsReducer";
import {usersReducer} from "./UsersReducer";
import {authReducer} from "./AuthReducer";
import { reducer as formReducer } from 'redux-form';
import {appReducer} from "./AppReducer";


export const rootReducer = combineReducers ({
  profilePage: profileReducer,
  dialogPage: dialogsReducer,
  friendPage: friendReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

export type RootReducerType = typeof rootReducer
export type StoreStateType = ReturnType<RootReducerType>

// типизация для actions
type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StoreStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.store = store;

export default store;