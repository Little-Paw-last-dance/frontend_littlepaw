import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterLink from '../components/RegisterLink';
import logoImg from '../assets/logo.png';
const LoginPage = () => {
  return (
    <div className="bg-yellow-300" style={{ width: '100%', height: '100%' }}>
      <Container disableGutters style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logoImg} alt="logo" style={{ width: 150, height: 150 }} />
        <Typography variant="h2" align="center" gutterBottom style={{ color: '#E0B46C', paddingBottom: 55 }}>
          Little Paw
        </Typography>
        <LoginForm />
        <RegisterLink />
      </Container>
      <style>{`
        /* Estilos personalizados */
        .bg-yellow-300 {
          background-color: #F7D783; /* Color de fondo para el contenedor principal */
        }
        /* Estilos para el contenedor principal */
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;