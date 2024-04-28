import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
const ShelterCard = ({ id,name, location, phone, image }) => {
    const navigate = useNavigate()
    return (
        <Card onClick={() =>navigate(`/shelters/${id}`)} className="font-roboto flex justify-start p-[1rem] w-[500px] h-[200px] rounded-xl hover:shadow-3xl cursor-pointer">
            <CardMedia component="img" className="w-[200px] rounded-xl" image={image} />
            <CardContent className="flex flex-col justify-between items-center text-center ">
                    <Typography className="text-center font-bold" gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Box className="flex flex-col justify-end items-center gap-[0.5rem]">
                        <Typography className="font-bold" variant="body2" component="p">
                            {`Ubicación: ${location}`}
                        </Typography>
                        <Typography className="font-bold" variant="body2" component="p">
                            {phone}
                        </Typography>
                    </Box>
            </CardContent>
        </Card>
    )
}

export default ShelterCard