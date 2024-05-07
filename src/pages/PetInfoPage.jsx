import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { backendAPI } from "../config/axiosConfig";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const PetInfoPage = () => {
  const { id, shelterId } = useParams();
  const [petData, setPetData] = useState({});
  const { accessToken, currentUser } = useAuth();
  const navigate = useNavigate();
  const [canAdopt, setCanAdopt] = useState(shelterId ? true: false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPetInfo = async () => {
      try {
        const response = await backendAPI.get(`/pet`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const pet = response.data.find((pet) => pet.pet.id  === parseInt(id));
        if (pet) {
          setPetData(pet);
        } else {
          if(shelterId){
            const shelterPetsResponse = await backendAPI.get(`/shelter/${shelterId}/pets`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            const shelterPet = shelterPetsResponse.data.petPosts.find((pet) => pet.pet.id === parseInt(id));
            if(shelterPet){
              setPetData(shelterPet);
              
            } else {
              console.error(
                "No se encontró información de la mascota con el ID proporcionado."
              );
            }
          } else {
          console.error(
            "No se encontró información de la mascota con el ID proporcionado."
          );
        }
        }
      } catch (error) {
        console.error("Error al obtener la información de la mascota:", error);
      }
    };

    fetchPetInfo();
  }, [id, accessToken]);

  useEffect(() => {
    console.log(currentUser)
    console.log(petData)

    if(petData && petData.user && petData.user.email !== undefined && currentUser && currentUser.email !== undefined){
      if(petData.user.email !== currentUser.email){
        setCanAdopt(true);
      }
    }
  },[petData, currentUser])



  const handleAdoptClick = () => {
    window.open(petData.contact, "_blank")
  };

  const handleGoBack = () => {
    if(shelterId){
      navigate(`/shelters/${shelterId}`);
    } else {
      navigate("/");
    }
  }

  return (
    <div className="bg-primary min-h-screen flex flex-col justify-start items-center pb-10">
      {Object.keys(petData).length !== 0 ? (
        <>
          <Card className="bg-white w-[80%] flex flex-col items-start mt-[2rem] py-[2rem] gap-[2rem] rounded-[4rem] px-[3rem]">
            <div className="flex flex-row w-full gap-[2rem]">
              <CardMedia
                component="img"
                className="w-[450px] h-[450px] rounded-xl object-cover"
                image={petData.pet.photos[0]}
              />

              <CardContent>
                <Typography
                  className="font-bold text-[2rem]"
                  variant="body2"
                  component="h6"
                >
                  Descripción:
                  <hr className="w-full border-[1px] border-primary mt-2 mb-2" />
                  {petData.pet.description}
                </Typography>
              </CardContent>
            </div>
            <div className="flex flex-row justify-center items-center gap-[1rem]">
              <CardContent className="flex flex-col justify-between items-start text-center mr-80">
                <Box className="flex flex-row justify-between  gap-[1rem]">
                  <Typography
                    className="text-center font-bold text-[3rem]"
                    gutterBottom
                    variant="h1"
                    component="div"
                  >
                    {petData.pet.name}
                  </Typography>
                  <FontAwesomeIcon
                    icon={petData.pet.sex === "Male" ? faMars : faVenus}
                    size="xl"
                  />
                </Box>
                <Typography
                  className="font-bold text-[2rem]"
                  variant="body2"
                  component="h6"
                >
                  {petData.pet.breed}
                </Typography>
                <Typography
                  className="font-bold text-[1.2rem]"
                  variant="body2"
                  component="p"
                >
                  {`${petData.pet.age} ${
                    petData.pet.age === 1 ? "año" : "años"
                  }`}
                </Typography>
              </CardContent>

              {petData.pet.photos && petData.pet.photos.length > 1 && (
                <div className="flex flex-row justify-between items-center gap-[2rem] mt-4">
                  {petData.pet.photos.slice(1).map((photo, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      className="w-[200px] h-[200px] rounded-xl object-cover"
                      image={photo}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-row justify-center items-center gap-[1rem] w-full">
              <Button
                variant="contained"
                className="bg-third text-sixth pt-2 pb-2 mt-5 w-full hover:bg-fourth"
                onClick={handleGoBack}
              >
                VOLVER
              </Button>
              
              {canAdopt && (
              <Button
                variant="contained"
                onClick={handleAdoptClick}
                className="bg-third text-sixth pt-2 pb-2 mt-5 hover:bg-fourth w-full"
              >

                Adoptar
              </Button>)}
              
            </div>
          </Card>
        </>
      ) : (
        <p className="font-roboto text-title text-third font-bold text-center">
          CARGANDO...
        </p>
      )}
    </div>
  );
};

export default PetInfoPage;
