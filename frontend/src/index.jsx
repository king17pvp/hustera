import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { setupTokenRefresh } from './redux/authSlice';
import App from './App';
import './index.css';

// Set up token refresh interceptor
store.dispatch(setupTokenRefresh());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
