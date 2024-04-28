import React from 'react';
import { Container, Typography } from '@mui/material';
import AddShelterForm from '../components/AddShelterForm';
import logoImg from '../assets/logo.png';

const AddPetPage = () => {
 
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <Typography variant="h2" align="center" gutterBottom fontWeight="bold" 
      className="font-montserrat text-third pb-10 pt-10">
        Añadir Refugio
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <AddShelterForm />
      </Container>
    </div>
  );
};

export default AddPetPage;
