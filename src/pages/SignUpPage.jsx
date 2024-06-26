import React from 'react';
import { Container, Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import logoImg from '../assets/logo.png';

/**
 * Página de registro de usuario.
 * @requires SignUpForm
 * 
 * @returns {React.Component} Página de registro de usuario.
 * 
 * @example
 * // Ejemplo de uso:
 * <SignUpPage />
 */

const SignUpPage = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <img src={logoImg} alt="logo" className="w-[150px] h-[150px]"/>
      <Typography
          variant="h2"
          align="center"
          gutterBottom
          className="pb-10 font-montserrat font-bold text-sixth"
        >
          Little Paw
        </Typography>
      <Container maxWidth="sm" disableGutters>
        <SignUpForm />
      </Container>
    </div>
  );
};

export default SignUpPage;
