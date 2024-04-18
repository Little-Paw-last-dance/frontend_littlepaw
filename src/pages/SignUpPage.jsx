import React from 'react';
import { Container, Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="bg-yellow-300 w-screen h-screen flex justify-center items-center" style={{ width: '100%', height: '100%' }}>
      <Container maxWidth="sm" disableGutters>
      <Typography variant="h2" align="center" gutterBottom style={{ fontFamily: 'Anybody, sans-serif', color: '#E0B46C', paddingBottom: 55, paddingTop: 55  }}>
          Little Paw
        </Typography>
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
      `}</style>
    </div>
  );
};

export default SignUpPage;