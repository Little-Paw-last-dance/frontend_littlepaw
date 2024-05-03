import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterLink from '../components/RegisterLink';
import logoImg from '../assets/logo.png';
/**
 * 
 * Página de inicio de sesión de la aplicación.
 * @requires LoginForm
 * @requires RegisterLink
 * 
 * @returns {React.Component} Página de inicio de sesión.
 * 
 * @example
 * // Ejemplo de uso:
 * <LoginPage />
 * 
 */
const LoginPage = () => {
  return (
    <div className="bg-primary h-full w-full m-0 p-0">
      <Container disableGutters className="w-full h-full flex flex-col justify-center items-center">
        <img className="w-[150px] h-[150px]" src={logoImg} alt="logo"/>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className="pb-10 font-montserrat font-bold text-sixth"
        >
          Little Paw
        </Typography>
        <LoginForm />
        <RegisterLink />
      </Container>
    </div>
  );
};

export default LoginPage;
