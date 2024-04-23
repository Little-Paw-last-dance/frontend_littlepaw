import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthContext';
import MainPage from './components/MainPage';
import logo from './logo.svg';
import Profile from './pages/Profile';
import 'react-phone-input-2/lib/style.css'
import AddPetPage from './pages/AddPetPage';

const App = () => {
  return (
    
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addpet" element={<AddPetPage />} />
          <Route path="/" element={<MainPage/>}/>

        </Routes>
        </AuthProvider>
      </Router>

  
  );
};

export default App;