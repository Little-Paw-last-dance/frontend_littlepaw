import React from 'react';
import { Link } from 'react-router-dom';

const RegisterLink = () => {
  return (
    
    <p className="align-center">
      <br />
      <span className="font-roboto text-black font-bold">
        ¿Aún no eres miembro?{' '}
      </span>
      <Link to="/signup" className="font-anybody text-white font-bold">
        Crear una cuenta
      </Link>
    </p>
  );
};

export default RegisterLink;
