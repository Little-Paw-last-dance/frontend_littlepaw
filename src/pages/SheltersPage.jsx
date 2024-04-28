import React from 'react'
import ShelterCard from '../components/ShelterCard'

const SheltersPage = () => {
  return (
    <div className="bg-primary min-h-screen flex flex-col justify-start items-center">
        <h1 className="font-montserrat text-title text-third font-bold text-center">Refugios</h1>
        <div className="flex flex-row flex-wrap justify-center items-center gap-[1rem] px-[2rem]">
            <ShelterCard name="Happy Paws Whiskers Shelter" location="Pawsitively Purrfect Shelter" phone="1234567890" />
            <ShelterCard name="Paws and Claws Shelter" location="456 Elm St, London" phone="0987654321" />
            <ShelterCard name="Furry Friends Shelter" location="789 Oak St, Sydney" phone="6789012345" />
            <ShelterCard name="Whiskers and Wags Shelter" location="202 Maple St, Mexico City" phone="5432167890" />
            <ShelterCard name="Pawsitively Purrfect Shelter" location="101 Pine St, Mumbai" phone="0987654321" />
            
        </div>

    </div>
  )
}

export default SheltersPage