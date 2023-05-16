import React from 'react'
import ReactDOM from 'react-dom/client';
import ScrollToTop from './components/scrollToTop/ScrollToTop.jsx';
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ScrollToTop/>
    <App />
  </React.StrictMode>,
)
