import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, InputBase, Card, CardContent, Typography, Grid, Drawer } from '@mui/material';
import { Search as SearchIcon, Male, Female } from '@mui/icons-material'; 
import { backendAPI } from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { petTypes } from '../models/petTypes';
import { petImages } from '../models/petImages';
import { petSex } from '../models/petSex';
import { petGenderImages } from '../models/petImages';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DrawerMenu from './DrawerMenu';

/** 
 * Página principal de la aplicación que muestra las mascotas disponibles para adopción.
 * 
 * @component
 * 
 * @state
 * @property {String} searchQuery - Búsqueda de mascotas.
 * @property {Array} searchResults - Resultados de la búsqueda de mascotas.
 * @property {String} selectedType - Tipo de mascota seleccionado.
 * @property {String} selectedSex - Sexo de mascota seleccionado.
 * @property {Boolean} open - Indica si el menú lateral está abierto.
 * @returns {React.Component} Página principal de la aplicación.
 * 
 * @example
 * // Ejemplo de uso:
 * <MainPage />
 * 
 * 
*/

const MainPage = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedSex, setSelectedSex] = useState('');
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await backendAPI.get(`/pet`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setSearchResults(response.data);
      } catch (error) {
        console.error('Error al obtener mascotas:', error);
      }
    };

    fetchPets();
  }, [accessToken]);

  
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleAddPetClick = () => {
    navigate("/addpet");
  };

  const handlePetClick = (petId) => {
    navigate(`/pet/${petId}`); 
  };

  const handleLogout = () => {
    logout();
  };

  const handlePetTypeClick = (type) => {
    if(selectedType === type) {
      setSelectedType('');
    } else {
      setSelectedType(type);
    }
  } 
  const handlePetSexClick = (value) => {
    if(selectedSex === value) {
      setSelectedSex('');
    } else {
      setSelectedSex(value);
    }
  }
  const handleToggleDrawer = () => {
    setOpen(!open);
  }

  const renderSearchResults = () => {
    return (
      <div className="flex flex-row justify-center items-center gap-[2rem] flex-wrap ">
        {searchResults.filter((pet) => 
        Object.values(pet.pet).some((value) =>
        (typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())) && (selectedType === '' || pet.pet.type === selectedType) && (selectedSex === '' || pet.pet.sex === selectedSex)
        )).map((result) => (
          <Card
            key={result.pet.id}
            className="w-[550px] h-[250px] rounded-xl hover:shadow-3xl cursor-pointer"
            onClick={() => handlePetClick(result.pet.id)}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <img src={result.pet.photos[0]} alt={result.pet.name} style={{ width: '100%', height: "200px", objectFit: "cover" }} />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h6" gutterBottom>{result.pet.name}</Typography>
                  <Typography variant="body1" gutterBottom>{`Edad: ${result.pet.age}`}</Typography>
                  <Typography variant="body1" gutterBottom>{`Raza: ${result.pet.breed}`}</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {result.pet.sex === 'Male' ? <Male /> : <Female />}
                    <Typography variant="body2" style={{ marginLeft: 5 }}>
                      {result.pet.sex === 'Male' ? 'Macho' : 'Hembra'}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <>
    <DrawerMenu open={open} setOpen={handleToggleDrawer} />
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
      <div className="flex flex-row justify-center items-center gap-[1rem]">
        <FontAwesomeIcon icon={faBars} size="2x" className="absolute text-sixth left-10 cursor-pointer" onClick={() => {setOpen(true)}} />
        <h1 className="font-anybody text-title text-sixth font-bold text-center">
          {currentUser?.displayName ? `Bienvenido ${currentUser?.displayName}` : "CARGANDO..."}
        </h1>
      </div>
      <div className="flex flex-row justify-center items-center gap-[3rem] mt-[5rem]">
        {petTypes.map((type) => (
          <button
            variant="contained"
            className={selectedType === type.value ?"bg-primary text-sixth w-[150px] h-[150px] border-none cursor-pointer shadow-xl rounded-xl" : 
            "bg-white text-sixth w-[150px] h-[150px] border-none cursor-pointer hover:shadow-xl rounded-xl"}
            onClick={() => handlePetTypeClick(type.value)}
          >
            <img className="w-full"src={selectedType === type.value ?petImages.find((image) => image.type === type.value).selected :petImages.find((image) => image.type === type.value).unselected} alt={type.label} />
          </button>
        ))}

      </div>
      <div className="flex flex-row justify-center items-center gap-[3rem] mt-[5rem]">
        {petSex.map((sex) => (
          <button
            variant="contained"
            className={selectedSex === sex ? "bg-primary text-sixth w-[150px] h-[150px] border-none cursor-pointer shadow-xl rounded-xl" :
            "bg-white text-sixth w-[150px] h-[150px] border-none cursor-pointer hover:shadow-xl rounded-xl"}
            onClick={() => handlePetSexClick(sex)}>
            <img className="w-full" src={selectedSex === sex ? petGenderImages.find((image) => image.type === sex).selected : petGenderImages.find((image) => image.type === sex).unselected} alt={sex} />
            </button>
        ))}
      </div>  

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
        </div>
      </div>
      
      {searchResults.length > 0 && (
        <div className="mt-5">
          {renderSearchResults()}
        </div>
      )}
    </div>
    </>

  );
};

export default MainPage;
