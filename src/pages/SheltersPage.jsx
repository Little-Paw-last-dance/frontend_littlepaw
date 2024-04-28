import React, { useEffect,useState } from 'react'
import ShelterCard from '../components/ShelterCard'
import { backendAPI } from '../config/axiosConfig'

const SheltersPage = () => {
  const [shelters, setShelters] = useState([])
  useEffect(() => {
    backendAPI.get("/shelter").then((response) => {
        setShelters(response.data)
    }).catch((error) => {
      console.error(error)
    })

  },[])  
  
  return (
    
    <div className="bg-primary min-h-screen flex flex-col justify-start items-center">
        <h1 className="font-montserrat text-title text-third font-bold text-center">Refugios</h1>
        <div className="flex flex-row flex-wrap justify-center items-center gap-[1rem] px-[2rem]">
            {shelters.length > 0 ? shelters.map((shelter) => (
                <ShelterCard key={shelter.id} name={shelter.name} location={shelter.location} phone={`+${shelter.countryCode}-${shelter.phone}`} image={shelter.photo} />
            )) : <p className="font-montserrat text-title text-third font-bold text-center">CARGANDO...</p>}
            
        </div>

    </div>
  )
}

export default SheltersPage