import React from 'react';
import {logoutTC} from "../../redux/AuthReduser";
import Header from "./header";
import {connect} from "react-redux";
import {StoreStateType} from "../../redux/redux-store";

type MapStatePropsType = {
  login: string,
  isAuth: boolean,
}
type MapDispatchPropsType = {
  logoutTC: () => void
}
export type HeaderContainerPropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

  render() {
    return <Header {...this.props}/>
  }
}

const mapStateToProps = (state: StoreStateType): MapStatePropsType => {
  return {
    login: state.auth.login,
    isAuth: state.auth.isAuth,
  }
}
/*const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    setAuthUserDataAC: (data: DataType) => {
      dispatch(setAuthUserDataAC(data))
    }
  }
}*/

export default connect(mapStateToProps, {logoutTC})(HeaderContainer);
