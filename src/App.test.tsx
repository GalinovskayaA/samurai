import React from "react";
import ReactDOM from "react-dom";
import SamuraiAppContainer from "./AppContainer";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SamuraiAppContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
