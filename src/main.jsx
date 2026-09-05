import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/base.css';
import './styles/components.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/sections2.css';
import './styles/sections3.css';
import './styles/sections4.css';
import './styles/sections5.css';
import './styles/sections6.css';
import './styles/sections7.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);