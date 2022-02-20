import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import { AuthProvider } from './context/AuthContext'

ReactDOM.render(
  // wrap all the pages with provider(contextAPI)
  // so we can access to user state globally.
  <AuthProvider>
    <AppRouter />
  </AuthProvider>,
  document.getElementById('root')
);
