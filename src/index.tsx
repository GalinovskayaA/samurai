import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SamuraiAppContainer from "./AppContainer";


ReactDOM.render(
  <React.StrictMode>
    <SamuraiAppContainer/>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

