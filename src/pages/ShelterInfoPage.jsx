import React, {useEffect, useState} from 'react'
import logo from "../assets/fondo2.jpg";
import { faLocationPin, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../config/axiosConfig'

const ShelterInfoPage = () => {
    const { id } = useParams()
    useEffect(() => {
        if(id === "") return
        backendAPI.get(`/shelter/${id}`).then((response) => {
            setShelter(response.data)
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
                    <img src={shelter.photo} alt="shelter" className="w-[500px] h-[500px] rounded-xl" />
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
        </div>
    )
}

export default ShelterInfoPage