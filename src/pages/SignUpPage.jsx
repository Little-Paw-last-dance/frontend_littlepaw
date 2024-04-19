import React from 'react';
import { Container, Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import logoImg from '../assets/logo.png';

const SignUpPage = () => {
  return (
    <div className="bg-yellow-300 min-h-screen flex flex-col justify-center items-center">
      <img src={logoImg} alt="logo" style={{ width: 150, height: 150 }} />
      <Typography variant="h2" align="center" gutterBottom style={{ fontFamily: 'Anybody, sans-serif', color: '#E0B46C', paddingBottom: 55, paddingTop: 55 }}>
        Little Paw
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <SignUpForm />
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
        /* Estilos para centrar verticalmente */
        .flex {
          display: flex;
        }
        .flex-col {
          flex-direction: column;
        }
        .justify-center {
          justify-content: center;
        }
        .items-center {
          align-items: center;
        }
        .min-h-screen {
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};

export default SignUpPage;
