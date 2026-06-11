import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Fontes self-hosted (subset latino — cobre PT-BR), font-display: swap (padrão @fontsource)
import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/bebas-neue/latin-400.css';
import '@fontsource/playfair-display/latin-400.css';
import '@fontsource/playfair-display/latin-700.css';
import '@fontsource/playfair-display/latin-400-italic.css';
import '@fontsource/pacifico/latin-400.css';

import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);