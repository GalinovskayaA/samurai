import React from 'react';
import {StoreStateType} from "./redux/redux-store";


const StoreContext = React.createContext({} as StoreStateType);

export type ProviderType = {
  store: StoreStateType,
  children: React.ReactNode
}

export const Provider = (props: ProviderType) => {
  return <StoreContext.Provider value={props.store}>
      {props.children}
    </StoreContext.Provider>
};

export default StoreContext;