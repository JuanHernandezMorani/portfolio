import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/globals.css';
import './styles/animations.css';

const savedTheme = typeof window !== 'undefined' && window.localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark';
if (typeof document !== 'undefined') {
  document.documentElement.dataset.theme = savedTheme;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <SpeedInsights />
  </React.StrictMode>
);
