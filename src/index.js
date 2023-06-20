import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from './store';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";

//const history = createHashHistory();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <HashRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);