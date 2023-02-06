import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import  {PictureProvider} from './context/context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PictureProvider>

  <BrowserRouter>
    <GoogleOAuthProvider clientId='757010538260-arnh8a0826kpi72fdqcb08fsp7agceiq.apps.googleusercontent.com'>
      <userPicture>
      <App/>
      </userPicture>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </PictureProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
