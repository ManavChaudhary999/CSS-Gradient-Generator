import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import './global.styles.css';

import AngleProvider from './components/AngleProvider';

const root = createRoot(document.getElementById('root'));
root.render(
    <AngleProvider>
        <App />
    </AngleProvider>
);
