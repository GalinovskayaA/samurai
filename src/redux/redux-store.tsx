import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {profileReduser} from "./ProfileReduser";
import {friendReduser} from "./FriendsReduser";
import {dialogsReduser} from "./DialogsReduser";
import {usersReduser} from "./UsersReduser";
import {authReduser} from "./AuthReduser";
import { reducer as formReducer } from 'redux-form';
import {appReduser} from "./AppReduser";


export const rootReducer = combineReducers ({
  profilePage: profileReduser,
  dialogPage: dialogsReduser,
  friendPage: friendReduser,
  usersPage: usersReduser,
  auth: authReduser,
  form: formReducer,
  app: appReduser
});

export type RootReducerType = typeof rootReducer
export type StoreStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

// @ts-ignore
window.store = store;

export default store;