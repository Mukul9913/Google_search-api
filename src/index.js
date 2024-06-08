import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';
import './global.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ResultContextProvider } from './contexts/ResultContextProvider';
const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
        <ResultContextProvider>
                <Router>
                        <App />
                </Router>
        </ResultContextProvider>
);