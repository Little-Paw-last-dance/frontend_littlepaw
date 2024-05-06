import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

/**
 * 
 * Componente de tarjeta de mascota que muestra la información básica de una mascota. 
 * 
 * @component
 * @param {Number} id - ID de la mascota
 * @param {String} name - Nombre de la mascota
 * @param {String} sex - Sexo de la mascota, el valor puede ser "Male" o "Female"
 * @param {String} breed - Raza de la mascota
 * @param {Number} age - Edad de la mascota
 * @param {String} image - Imagen de la mascota
 * @param {Number} shelterId - ID del refugio al que pertenece la mascota
 * @returns {React.Component} - Componente de tarjeta de mascota
 * 
 * @example
 * // Ejemplo de uso de PetCard
 * <PetCard name="Firulais" sex="Male" breed="Pitbull" age={2} image="https://www.example.com/firulais.jpg" />
 */

const PetCard = ({ id, name, sex, breed, age, image, shelterId }) => {
    const navigate = useNavigate()
    return (
        <Card onClick={() => {navigate(`/pet/${id}/shelter/${shelterId}`)}}className="font-roboto flex justify-start p-[1rem] w-[500px] h-[200px] rounded-xl hover:shadow-3xl cursor-pointer">
            <CardMedia component="img" className="w-[200px] rounded-xl" image={image} />
            <CardContent className="flex flex-col justify-between items-start text-center ">
                <Box className="flex flex-row justify-between  gap-[1rem]">
                    <Typography className="text-center font-bold text-[2rem]" gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <FontAwesomeIcon icon={sex === "Male" ? faMars : faVenus} size='xl' />
                </Box>

                <Typography className="font-bold text-[1rem]" variant="body2" component="h6">
                    {breed}
                </Typography>
                <Typography className="font-bold" variant="body2" component="p">
                    {`${age} ${age === 1 ? "año" : "años"}`}
                </Typography>

            </CardContent>
        </Card>
    )
}

export default PetCard