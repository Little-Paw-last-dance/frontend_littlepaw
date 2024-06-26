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
import PrivateRoute from './helpers/PrivateRoute';
import AdminAddPetPage from './pages/AdminAddPetPage';
import PetInfoPage from './pages/PetInfoPage';
import { HelmetProvider, Helmet } from 'react-helmet-async';


const App = () => {

  const outerTheme = useTheme();

  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>Little Paw</title>
        <meta name="description" content="Little Paw es una aplicación web que conecta a refugios de animales y dueños de mascotas con personas interesadas en adoptar mascotas." />
        <meta name="keywords" content="mascotas, adopción, refugios, animales, perros, gatos, conejos, reptiles, aves" />
      </Helmet>
    </HelmetProvider>

    <Router>
      <AuthProvider>
        <ThemeProvider theme={customTheme(outerTheme)}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addpet" element={<AddPetPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/shelters" >
              <Route index element={<SheltersPage />} />
              <Route path=":id" element={<ShelterInfoPage />} />
              
            </Route>
            <Route path="/" element={<MainPage />} />
            <Route path="/pet/:id">
              <Route index element={<PetInfoPage />} />
              <Route path="shelter/:shelterId" element={<PetInfoPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/addshelter" element={<AddShelter />} />
              <Route path="/shelteraddpet">
                <Route path=":id" element={<AdminAddPetPage />} />
              </Route>
            </Route>

          </Routes>
          </ThemeProvider>
      </AuthProvider>
      </Router >
      </>

  
  );
};

export default App;