import React from 'react';
import { Container, Typography } from '@mui/material';
import AddPetForm from '../components/AddPetForm';

/**
 * Página para añadir una mascota a la base de datos.
 * @requires AddPetForm
 * 
 * @returns {React.Component} Página de añadir mascota.
 * 
 * @example
 * // Ejemplo de uso:
 * <AddPetPage />
 */

const AddPetPage = () => {
 
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <Typography variant="h2" align="center" gutterBottom fontWeight="bold" 
      className="font-montserrat text-third pb-10 pt-10">
        Añadir Mascota
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <AddPetForm />
      </Container>
    </div>
  );
};

export default AddPetPage;
