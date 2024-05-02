import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { backendAPI } from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { accessToken } = useAuth();

  const handleSearch = async () => {
    try {
      const response = await backendAPI.get(`/pet`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Resultados de búsqueda:', response.data);
      const filteredResults = response.data.filter((result) =>
        Object.values(result.pet).some((value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAddPetClick = () => {
    navigate("/addpet");
  };

  const handleLogout = () => {
    logout();
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-[3rem]">
      <Button
        variant="contained"
        className="bg-yellow-300 text-white"
        style={{ backgroundColor: "#E0B46C", marginTop: 15 }}
        onClick={handleProfileClick}
      >
        Ver Perfil
      </Button>
      <Button
        variant="contained"
        className="bg-yellow-300 text-white"
        style={{ backgroundColor: "#E0B46C", marginTop: 15 }}
        onClick={handleAddPetClick}
      >
        Añadir Mascota
      </Button>
      <Button
        variant="contained"
        className="bg-yellow-300 text-white"
        style={{ backgroundColor: "#E0B46C", marginTop: 15 }}
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </div>
  );

  return (
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
      <div className="flex flex-row justify-center items-center gap-[1rem]">
        <h1 className="font-anybody text-title text-white font-bold text-center">
          {currentUser?.displayName ? `Bienvenido ${currentUser?.displayName}` : "CARGANDO..."}
        </h1>
      </div>
      {currentUser?.displayName && content}

      <div className="flex justify-center mt-5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon style={{ color: "#E0B46C" }} />
          </div>
          <InputBase
            placeholder="Buscar..."
            className="pl-10 pr-3 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:border-[#E0B46C] w-80"
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#E0B46C", color: "#FFFFFF", marginLeft: 10 }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </div>
      </div>

      {searchResults.length > 0 && (
        <div className="mt-5">
          <h2>Resultados de búsqueda:</h2>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3>{result.pet.name}</h3>
                <p>Edad: {result.pet.age}</p>
                <p>Sexo: {result.pet.sex}</p>
                <p>Raza: {result.pet.breed}</p>
                <p>Descripción: {result.pet.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainPage;
