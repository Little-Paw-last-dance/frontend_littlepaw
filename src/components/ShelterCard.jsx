import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import React from 'react'
import logo from "../assets/fondo2.jpg";
const ShelterCard = ({ name, location, phone }) => {
    return (
        <Card className="font-roboto  flex p-[1rem] max-w-[500px] max-h-[300px] rounded-xl hover:shadow-3xl cursor-pointer">
            <CardMedia component="img" className="w-[200px]" image={logo} />
            <CardContent>
                <Box className="flex flex-col justify-center items-center pl-[1rem] gap-[2rem]">
                    <Typography className="text-center font-bold" gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography className="font-bold"variant="body2" component="p">
                        {`Ubicación: ${location}`}
                    </Typography>
                    <Typography className="font-bold"variant="body2" component="p">
                        {phone}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ShelterCard