import React from 'react'
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
const PetCard = ({ name, sex, breed, age, image }) => {
    return (
        <Card className="font-roboto flex justify-start p-[1rem] w-[500px] h-[200px] rounded-xl hover:shadow-3xl cursor-pointer">
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