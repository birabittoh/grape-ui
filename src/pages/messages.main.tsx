import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import Messages from './Messages.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Messages />
  </StrictMode>,
)
