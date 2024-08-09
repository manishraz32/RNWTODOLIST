import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});


function App() {
  const { authUser } = useAuthContext();
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <header className="app-header">
          <h1>Red N White ToDo List</h1>
        </header>
        <main className="app-main w-full">
          <Routes>
            <Route path="/" element={authUser ? <Home /> : <Login />} />
            <Route path="/login" element={authUser ? <Home /> : <Login /> } />
            <Route path="/signup" element={authUser ? <Home/> : <Signup />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; Red N White ToDo List</p>
        </footer>
      </div>
      <Toaster />
    </ThemeProvider>

  );
}

export default App;
