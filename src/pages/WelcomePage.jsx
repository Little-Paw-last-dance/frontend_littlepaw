import React from "react";
import logo from "../assets/fondo2.jpg";
import { Link } from "react-router-dom";

/**
 * Página de bienvenida de la aplicación.
 * 
 * @returns {React.Component} Página de bienvenida.
 * 
 * @example
 * // Ejemplo de uso:
 * <WelcomePage />
 */


const WelcomePage = () => {
  return (
    <div
      style={{backgroundImage: `url(${logo})`}}
      className="font-roboto bg-cover bg-center min-h-screen relative flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-8xl font-bold mb-4">Little Paw</h1>
        <p className="text-4xl mb-8">Encuentra a tu mejor amigo</p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-secondary no-underline hover:bg-fourth text-sixth font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="bg-secondary no-underline hover:bg-fourth text-sixth font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
