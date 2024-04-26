import React from 'react';
import { Container, Typography } from '@mui/material';
import AddPetForm from '../components/AddPetForm';
import logoImg from '../assets/logo.png';

const AddPetPage = () => {
 
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <Typography variant="h2" align="center" gutterBottom fontWeight="bold" 
      style={{ fontFamily: 'Montserrat, sans-serif', color: '#47361A', paddingBottom: 55, paddingTop: 55 }}>
        Añadir Mascota
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <AddPetForm />
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

export default AddPetPage;
