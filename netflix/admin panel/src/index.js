import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authC/AuthContext';
import { MovieContextProvider } from './context/movieC/MovieContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
