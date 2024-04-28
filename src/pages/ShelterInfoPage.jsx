import React, {useEffect} from 'react'
import logo from "../assets/fondo2.jpg";
import { faLocationPin, faPhone, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { backendAPI } from '../config/axiosConfig'

const ShelterInfoPage = () => {
    
    return (
        <div className="bg-primary min-h-screen flex flex-col justify-start items-center">
            <div className="bg-white w-[80%] flex flex-row justify-center items-start  mt-[2rem] py-[2rem] gap-[2rem] rounded-[4rem]">
                <div className="flex flex-col justify-center items-center gap-[1rem]">
                    <img src={logo} alt="shelter" className="w-[500px] h-[500px] rounded-xl" />
                    <h1 className="font-roboto text-title text-third font-bold text-center">Refugio</h1>
                </div>
                <div className="flex flex-col justify-start items-start gap-[1rem]">
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faLocationPin} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">Dirección</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faPhone} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">Teléfono</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-[1rem]">
                        <FontAwesomeIcon icon={faGlobe} size='xl' />
                        <p className="font-roboto text-subtitle text-third font-bold text-center">Página Web</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShelterInfoPage