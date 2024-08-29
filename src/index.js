import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ExtraordinaryPortfolio from './App';
import SmoothScrollPortfolio from './App';
import ImprovedPortfolio from './App';
import IntegratedPortfolio from './Integreted';
import FullscreenThreePortfolio from './Integreted';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntegratedPortfolio />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
