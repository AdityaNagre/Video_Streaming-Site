import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authC/AuthContext';
import { MovieContextProvider } from './context/movieC/MovieContext';
import { UserContextProvider } from './context/userC/UserContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <MovieContextProvider>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
