import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/styles.css';
import { SniffNearApp } from './SniffNearApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SniffNearApp />
  </React.StrictMode>
);