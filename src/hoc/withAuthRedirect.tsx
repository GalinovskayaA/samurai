import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";
import {StoreStateType} from "../redux/redux-store";
import {connect} from "react-redux";

type MapStatePropsForRedirectType = {
  isAuth: boolean
}
const mapStateToPropsForRedirect = (state: StoreStateType): MapStatePropsForRedirectType => {
  return {
    isAuth: state.auth.isAuth
  }
}
// Из урока Инкубатора на функциональной компоненте ------->

export function withAuthRedirect<T>(Component: ComponentType<T>) {
  const RedirectComponent = (props: MapStatePropsForRedirectType) => {
    let {isAuth, ...restProps} = props
    if (!isAuth) return <Redirect to={'/login'}/>
    return <Component {...restProps as T}/>
  }
  return connect(mapStateToPropsForRedirect, {})(RedirectComponent)
}

/* Из урока Димыча на классовой компоненте
export const withAuthRedirect = (Component: any) => {
  class RedirectComponent extends React.Component<MapStatePropsForRedirectType> {
    render() {
      console.log(this.props)
      if (!this.props.isAuth) return <Redirect to={"/login"}/>
      return <Component {...this.props}/>
    }
  }

  const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

  return ConnectedAuthRedirectComponent
};*/

