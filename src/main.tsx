import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Apply dark mode class to HTML document


createRoot(document.getElementById('root')!).render(
    <App />
)
