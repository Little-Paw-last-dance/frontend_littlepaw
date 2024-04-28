import React from 'react';
import { Container, Typography } from '@mui/material';
import SignUpForm from '../components/SignUpForm';
import logoImg from '../assets/logo.png';

const SignUpPage = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
      <img src={logoImg} alt="logo" style={{ width: 150, height: 150 }} />
      <Typography variant="h2" align="center" gutterBottom style={{ fontFamily: 'Montserrat', color: '#47361A', paddingBottom: 55, paddingTop: 55, fontWeight: 500
     }}>
        Little Paw
      </Typography>
      <Container maxWidth="sm" disableGutters>
        <SignUpForm />
      </Container>
    </div>
  );
};

export default SignUpPage;
