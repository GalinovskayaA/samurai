import React, {Component, ComponentType} from "react";
import {connect} from "react-redux";
import Preloader from "../components/common/preloader";

type MapStatePropsType = {

}

export function withSuspense<T>(Component: ComponentType<T>) {
  return (props: MapStatePropsType) => {
    return <React.Suspense fallback={<Preloader/>}> <Component {...props as T}/> </React.Suspense>
  }
}

