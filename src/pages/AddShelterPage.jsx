import React from 'react';
import { Container, Typography } from '@mui/material';
import AddShelterForm from '../components/AddShelterForm';
import logoImg from '../assets/logo.png';

/**
 * Página para añadir un refugio a la base de datos.
 * @requires AddShelterForm
 * 
 * @returns {React.Component} Página de añadir refugio.
 * 
 * @example
 * // Ejemplo de uso:
 * <AddShelterPage />
 */

const AddPetPage = () => {
 
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <Typography variant="h2" align="center" gutterBottom fontWeight="bold" 
      className="font-montserrat text-sixth pb-10 pt-10">
        Añadir Refugio
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <AddShelterForm />
      </Container>
    </div>
  );
};

export default AddPetPage;
