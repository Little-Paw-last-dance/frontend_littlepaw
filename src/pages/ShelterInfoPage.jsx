import React, {useEffect, useState} from 'react'
import { faLocationPin, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../config/axiosConfig'
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import PetCard from '../components/PetCard'

/**
 * Página de información de un refugio que muestra la información del refugio y las mascotas que alberga.
 * 
 * @requires PetCard
 * 
 * @state
 * @property {Array} roles - Roles del usuario autenticado.
 * @property {Object} shelter - Información del refugio.
 * @property {Array} pets - Mascotas del refugio.
 * 
 * @returns {React.Component} Página de información de un refugio.
 * 
 * @example
 * // Ejemplo de uso:
 * <ShelterInfoPage />
 */

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
                backendAPI.get(`/shelter/${id}/pets`, {headers: {"Authorization": `Bearer ${accessToken}`}}).then((petsResponse) => {
                    setPets(petsResponse.data.petPosts)
                    window.scrollTo(0,0)
                }).catch((error) => {
                    console.error(`Hubo un error al obtener las mascotas: ${error}`)
                })
            }).catch((error) => {
                console.error(`Hubo un error al obtener los roles de usuario: ${error}`)
            })
        }).catch((error) => {
            console.error(error)
        })


    }, [id])

    const [shelter, setShelter] = useState({})
    const [pets, setPets] = useState([])
    
    return (
        <div className="bg-primary min-h-screen flex flex-col justify-start items-center pb-10">
            {Object.keys(shelter).length !== 0 ?
            <>
            <div className="bg-white w-[80%] flex flex-row justify-center items-start  mt-[2rem] py-[2rem] gap-[2rem] rounded-[4rem] px-[2rem]">
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
                        <p className="font-roboto text-subtitle text-third font-bold text-center break-all">{shelter.urlPage}</p>
                    </div>
                </div>
            </div>
            {pets.length > 0 &&
            <h1 className="font-roboto text-title text-third font-bold text-center mt-5">MASCOTAS</h1>}
            <div className="flex flex-row justify-center items-center gap-[2rem] flex-wrap">
                {pets.length > 0 && pets.map((pet) => (
                    <PetCard id={pet.pet.id} name={pet.pet.name} sex={pet.pet.sex} breed={pet.pet.breed} age={pet.pet.age} image={pet.pet.photos[0]} shelterId={id}/>
                ))}
            </div>
            

            </>
        
            : <p className="font-roboto text-title text-third font-bold text-center">CARGANDO...</p>}
            <div className="flex flex-row justify-center items-center gap-[1rem]">
                <Button variant='contained' className="bg-third text-sixth pt-2 pb-2 mt-5 hover:bg-fourth" onClick={() => navigate("/shelters")}>VOLVER</Button>
                {roles.includes("admin") && <Button variant="contained" onClick={() => navigate(`/shelteraddpet/${id}`)} className="bg-third text-sixth pt-2 pb-2 mt-5 hover:bg-fourth">AÑADIR MASCOTA</Button>}
            </div>
        </div>
    )
}

export default ShelterInfoPage