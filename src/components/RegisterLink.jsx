import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Componente que muestra un enlace para redirigir a la página de registro desde la página de inicio de sesión.
 * 
 * @component
 * 
 * @returns {React.Component} - Componente de enlace de registro.
 * 
 * @example
 * // Ejemplo de uso:
 * <RegisterLink />
 * 
 */

const RegisterLink = () => {
  return (
    
    <p className="align-center">
      <br />
      <span className="font-roboto text-sixth font-bold">
        ¿Aún no eres miembro?{' '}
      </span>
      <Link to="/signup" className="font-anybody text-fifth font-bold">
        Crear una cuenta
      </Link>
    </p>
  );
};

export default RegisterLink;
