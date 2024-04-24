import React from "react";
import logo from "../assets/fondo2.jpg";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div
      className="min-h-screen relative flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${logo})`, // Establece la imagen de fondo
        backgroundSize: "cover", // Ajusta el tamaño de la imagen para cubrir el fondo
        backgroundPosition: "center", // Centra la imagen en el fondo
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center">
        <h1 className="text-8xl font-bold mb-4">Little Paw</h1>
        <p className="text-4xl mb-8">Encuentra a tu mejor amigo</p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-2xl"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
