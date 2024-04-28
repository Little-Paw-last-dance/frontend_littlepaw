import React, { useEffect,useState } from 'react'
import ShelterCard from '../components/ShelterCard'
import { backendAPI } from '../config/axiosConfig'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SheltersPage = () => {
    const {accessToken} = useAuth()
  const [shelters, setShelters] = useState([])
  const [roles, setRoles] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if(accessToken === "") return
    backendAPI.get("/shelter").then((response) => {
        setShelters(response.data)
        backendAPI.get("/user", {headers: {"Authorization": `Bearer ${accessToken}`}}).then((userResponse) => {
            setRoles(userResponse.data.user.roles.map((role) => role.name))
        }).catch((error) => {
            console.error(`Hubo un error al obtener los roles de usuario: ${error}`)
        })
    }).catch((error) => {
      console.error(`Hubo un error al obtener los refugios: ${error}`)
    })

  },[accessToken])  
  
  return (
    
    <div className="bg-primary min-h-screen flex flex-col justify-start items-center">
        <h1 className="font-montserrat text-title text-third font-bold text-center">Refugios</h1>
        <div className="flex flex-row flex-wrap justify-center items-center gap-[1rem] px-[2rem]">
            {shelters.length > 0 ? shelters.map((shelter) => (
                <ShelterCard key={shelter.id} id={shelter.id} name={shelter.name} location={shelter.location} phone={`+${shelter.countryCode}-${shelter.phone}`} image={shelter.photo} />
            )) : <p className="font-montserrat text-title text-third font-bold text-center">CARGANDO...</p>}
            
        </div>
        {roles.includes("admin") && <Button variant="contained" className="bg-third text-primary pt-2 pb-2 mt-5 hover:bg-sixth" onClick={() => {navigate("/addshelter")}}>AÑADIR REFUGIO</Button>}
        
    </div>
  )
}

export default SheltersPage