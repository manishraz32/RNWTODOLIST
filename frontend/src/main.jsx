import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from 'react-router-dom'
import { ResetTaksContextProvider } from './context/ResetTasksContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ResetTaksContextProvider>
          <App />
        </ResetTaksContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
