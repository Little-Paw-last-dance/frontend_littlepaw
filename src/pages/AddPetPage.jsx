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
    </div>
  );
};

export default AddPetPage;
