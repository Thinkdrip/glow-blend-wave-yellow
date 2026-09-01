import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
