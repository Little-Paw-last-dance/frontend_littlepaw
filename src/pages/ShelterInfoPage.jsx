import React, {useEffect, useState} from 'react'
import { faLocationPin, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../config/axiosConfig'
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ShelterInfoPage = () => {
    const { id } = useParams()
    const [roles, setRoles] = useState([])
    const {accessToken} = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if(id === "") return
        backendAPI.get(`/shelter/${id}`).then((response) => {
            setShelter(response.data)
            backendAPI.get("/user", {headers: {"Authorization": `Bearer ${accessToken}`}}).then((userResponse) => {
                setRoles(userResponse.data.user.roles.map((role) => role.name))
            }).catch((error) => {
                console.error(`Hubo un error al obtener los roles de usuario: ${error}`)
            })
        }).catch((error) => {
            console.error(error)
        })


    }, [id])

    const [shelter, setShelter] = useState({})
    
    return (
        <div className="bg-primary min-h-screen flex flex-col justify-start items-center">
            {Object.keys(shelter).length !== 0 ?
            <div className="bg-white w-[80%] flex flex-row justify-center items-start  mt-[2rem] py-[2rem] gap-[2rem] rounded-[4rem]">
                <div className="flex flex-col justify-center items-center gap-[1rem]">
                    <img src={shelter.photo} alt="shelter" className="w-[500px] h-[500px] rounded-xl object-cover" />
                    <h1 className="font-roboto text-title text-third font-bold text-center">{shelter.name}</h1>
                </div>
                <div className="flex flex-col justify-start items-start gap-[1rem]">
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faLocationPin} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">{shelter.location}</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faPhone} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">{`+${shelter.countryCode}-${shelter.phone}`}</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faGlobe} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">{shelter.urlPage}</p>
                    </div>
                </div>
            </div>
            : <p className="font-roboto text-title text-third font-bold text-center">CARGANDO...</p>}
            {roles.includes("admin") && <Button variant="contained" onClick={() => navigate(`/shelteraddpet/${id}`)} className="bg-third text-primary pt-2 pb-2 mt-5 hover:bg-sixth">AÑADIR MASCOTA</Button>}
        </div>
    )
}

export default ShelterInfoPage