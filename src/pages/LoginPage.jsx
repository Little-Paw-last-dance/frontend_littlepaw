import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterLink from '../components/RegisterLink';
import logoImg from '../assets/logo.png';
const LoginPage = () => {
  return (
    <div className="bg-primary h-full w-full m-0 p-0">
      <Container disableGutters style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img className="w-[150px] h-[150px]" src={logoImg} alt="logo"/>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          style={{
            paddingBottom: 55,
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            color: '#47361A',
          }}
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
