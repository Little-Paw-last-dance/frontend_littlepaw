import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
  return (
    <p style={{ textAlign: 'center' }}>
      <span style={{ fontFamily: 'Anybody, sans-serif', color: 'black', fontWeight: 'bold' }}>
        ¿Aún no eres miembro?{' '}
      </span>
      <Link to="/registro" style={{ fontFamily: 'Anybody, sans-serif', color: 'white', fontWeight: 'bold' }}>
        Crear una cuenta
      </Link>
    </p>
  );
};

export default RegisterLink;
