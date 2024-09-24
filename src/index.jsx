import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import for React 18+
import './index.css'; 
import App from './App';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root and render the App component
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
