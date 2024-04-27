import React, {useState, useEffect} from 'react'
import ProfileInfo from '../components/ProfileInfo'
import ProfileInput from '../components/ProfileInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import { backendAPI } from '../config/axiosConfig'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
    
    const [names, setNames] = useState("Juan Carlos")
    const [paternalSurname, setPaternalSurname] = useState("Pérez")
    const [maternalSurname, setMaternalSurname] = useState("García")
    const [age, setAge] = useState("25")
    const [city, setCity] = useState("CDMX")
    const [phone, setPhone] = useState("55-1234-5678")
    const [editable, setEditable] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("")
    const [nameError, setNameError] = useState(false)
    const [nameErrorMessage, setNameErrorMessage] = useState("")
    const [paternalSurnameError, setPaternalSurnameError] = useState(false)
    const [paternalSurnameErrorMessage, setPaternalSurnameErrorMessage] = useState("")
    const [ageError, setAgeError] = useState(false)
    const [ageErrorMessage, setAgeErrorMessage] = useState("")
    const [cityError, setCityError] = useState(false)
    const {accessToken} = useAuth()
    const [isStarting, setIsStarting] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        if(accessToken === "") return
        backendAPI.get("/user", {headers: {"Authorization": `Bearer ${accessToken}`}}).then((response) => {
            
            setNames(response.data.user.names)
            setPaternalSurname(response.data.user.paternalSurname)
            setMaternalSurname(response.data.user.maternalSurname)
            setAge(response.data.user.age)
            setCity(response.data.user.city)
            setPhone(`+${response.data.user.countryCode}-${response.data.user.phone}`)
            setIsStarting(false)
        }).catch((error) => {
            console.log(error)
        })

    },[accessToken])
    

    

  const submitChanges = (e) => {
    e.preventDefault()
    let errors = 0
    setPhoneError(false)
    setPhoneErrorMessage("")
    setNameError(false)
    setNameErrorMessage("")
    setPaternalSurnameError(false)
    setPaternalSurnameErrorMessage("")
    setAgeError(false)
    setAgeErrorMessage("")
    setCityError(false)
    setCityError("")
    if(!editable){
        setEditable(!editable)
        return
    }
    let dialCode = phone.split("-")[0].split("+")[1]
    let phoneNumber = phone.split("-")[1]
    if(phoneNumber === "undefined" || phoneNumber.length < 8){
        setPhoneError(true)
        setPhoneErrorMessage("El número de teléfono debe tener al menos 8 dígitos")
        errors++
        
    }
    if(names === "" || names.length < 2){
        setNameError(true)
        setNameErrorMessage("El nombre debe tener al menos 2 caracteres")
        errors++
        
    }
    if(paternalSurname === "" || paternalSurname.length < 2){
        setPaternalSurnameError(true)
        setPaternalSurnameErrorMessage("El apellido paterno debe tener al menos 2 caracteres")
        errors++
        
    }
    if(age === "" || age < 0 || age > 120){
        setAgeError(true)
        setAgeErrorMessage("La edad debe ser un número entre 0 y 120")
        errors++
        
    }
    if(city === ""){
        setCityError(true)
        setCityError("La ciudad no puede estar vacía")
        errors++
        
    }
    if(errors > 0) return

    let ageNumber = parseInt(age)
    let countryCodeNumber = parseInt(dialCode)
    
    backendAPI.patch("/user", {names, paternalSurname, maternalSurname, age:ageNumber, city, phone: phoneNumber, countryCode: countryCodeNumber}, {headers: {"Authorization": `Bearer ${accessToken}`}}).then((response) => {
        setEditable(!editable)
        window.scrollTo(0, 0)
    }).catch((error) => {
        console.error("Error al actualizar el perfil:", error)
    })
    
  }  

  return (
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
        <div className="flex flex-row justify-center items-center gap-[1rem]">
            <h1 className="font-montserrat text-title text-thrird font-bold text-center">Perfil</h1>
            {!editable &&
            <FontAwesomeIcon onClick={() => {setEditable(!editable)}} icon={faPencil } className="text-thrird cursor-pointer" size={"xl"} />}
            
        </div>

        <div className="flex flex-col justify-center items-left py-[3rem] px-[24rem] gap-[4rem]">
            {isStarting ? <p className="font-montserrat text-white text-title text-center">CARGANDO...</p> :editable ? 
            <form onSubmit={submitChanges}>
                <ProfileInput title={"Nombres"} content={names} setContent={setNames} type={"text"} setError={setNameError} placeholder={"Escriba su nombre"}/>
                <br/>
                {nameError && <p className="text-red-500 text-sm font-bold">{nameErrorMessage}</p>}
                <ProfileInput title={"Apellido Paterno"} content={paternalSurname} setContent={setPaternalSurname} type={"text"} setError={setPaternalSurnameError} placeholder={"Escriba su apellido paterno"}/>
                <br/>
                {paternalSurnameError && <p className="text-red-500 text-sm font-bold">{paternalSurnameErrorMessage}</p>}
                <ProfileInput title={"Apellido Materno"} content={maternalSurname} setContent={setMaternalSurname} type={"text"} placeholder={"Escriba su apellido materno"}/>
                <ProfileInput title={"Edad"} content={age} setContent={setAge} type={"number"} setError={setAgeError} placeholder={"Escriba su edad"}/>
                <br/>
                {ageError && <p className="text-red-500 text-sm font-bold">{ageErrorMessage}</p>}
                <ProfileInput title={"Ciudad"} isSelect content={city} setContent={setCity} type={"text"} setError={setCityError} placeholder={"Escriba su ciudad"}/>
                <br/>
                {cityError && <p className="text-red-500 text-sm font-bold">{cityError}</p>}

                <ProfileInput title={"Teléfono"} content={phone} setContent={setPhone} type={"phone"} setError={setPhoneError}/>
                <br/>
                {phoneError && <p className="text-red-500 text-sm font-bold">{phoneErrorMessage}</p>}
            </form>
            : <>
            <ProfileInfo title={"Nombres"} content={names}/>
            <ProfileInfo title={"Apellido Paterno"} content={paternalSurname}/>
            {maternalSurname !== "" && <ProfileInfo title={"Apellido Materno"} content={maternalSurname}/>}
            <ProfileInfo title={"Edad"} content={age} />
            <ProfileInfo title={"Ciudad"} content={city}/>
            <ProfileInfo title={"Teléfono"} content={phone}/>
            </>
            }
        </div>

        <div className="flex flex-row justify-center items-center gap-[1rem]">
            {editable && <Button variant="contained" type="submit"  style={{ backgroundColor: "#47361A",color: "#F7C677", marginTop: 15, }} onClick={submitChanges}>GUARDAR CAMBIOS</Button>}
            <Button variant="contained"  style={{ backgroundColor: "#47361A",color: "#F7C677",marginTop: 15, width: 100 }} onClick={() => {navigate("/")}}>VOLVER</Button>
        </div>

        

    </div>
  )
}

export default Profile