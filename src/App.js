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
import WelcomePage from './pages/WelcomePage';
import AddShelter from './pages/AddShelterPage';
import SheltersPage from './pages/SheltersPage';
import { ThemeProvider, useTheme } from '@mui/material';
import { customTheme } from './themes/TextFieldTheme';
import ShelterInfoPage from './pages/ShelterInfoPage';


const App = () => {

  const outerTheme = useTheme();

  return (

    <Router>
      <AuthProvider>
        <ThemeProvider theme={customTheme(outerTheme)}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addpet" element={<AddPetPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/addshelter" element={<AddShelter />} />
            <Route path="/shelters" >
              <Route index element={<SheltersPage />} />
              <Route path=":id" element={<ShelterInfoPage />} />
            </Route>
            <Route path="/" element={<MainPage />} />

          </Routes>
          </ThemeProvider>
      </AuthProvider>
      </Router >

  
  );
};

export default App;