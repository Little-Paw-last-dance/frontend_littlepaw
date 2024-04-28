import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PetCard from './PetCard'

const MainPage = () => {
  const {logout, currentUser} = useAuth()
  const navigate = useNavigate()

  const content = (
    <div className="flex flex-col items-center justify-center gap-[3rem]">
      <Button variant="contained" className="bg-yellow-300 text-white"  style={{ backgroundColor: "#E0B46C", marginTop: 15 }} onClick={() => {navigate("/profile")}}>Ver Perfil</Button>
      <Button variant="contained" className="bg-yellow-300 text-white"  style={{ backgroundColor: "#E0B46C", marginTop: 15 }} onClick={() => {navigate("/addpet")}}>Añadir Mascota</Button>
      <Button variant="contained" className="bg-yellow-300 text-white"  style={{ backgroundColor: "#E0B46C", marginTop: 15 }} onClick={() => {navigate("/addshelter")}}>Añadir Refugio</Button>
      <Button onClick={logout} variant="contained" className="bg-yellow-300 text-white"  style={{ backgroundColor: "#E0B46C", marginTop: 15 }}>Cerrar Sesión</Button>

    </div>

  )  
  return (
    <>
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
        <div className="flex flex-row justify-center items-center gap-[1rem]">
            <h1 className="font-montserrat text-title text-white font-bold text-center">{currentUser?.displayName ? `Bienvenido ${currentUser?.displayName}` : "CARGANDO..."}</h1>  
        </div>
        {currentUser?.displayName && content}
        
    </div>
    <div className="bg-primary flex flex-col items-center justify-center gap-[3rem]">
      
       
    </div>
    </>
  )
}

export default MainPage