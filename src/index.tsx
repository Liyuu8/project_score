import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import projectScoreTheme from './contexts/theme';
import { ThemeContext } from './contexts';
import FirebaseApp from './FirebaseApp';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseApp>
        <ThemeContext.Provider value={projectScoreTheme}>
          <App />
        </ThemeContext.Provider>
      </FirebaseApp>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
