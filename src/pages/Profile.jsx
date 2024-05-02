import React, {useState, useEffect} from 'react'
import ProfileInfo from '../components/ProfileInfo'
import ProfileInput from '../components/ProfileInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'

import { backendAPI } from '../config/axiosConfig'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/**
 * Página de perfil de usuario que muestra la información del usuario autenticado y permite editarla.
 * 
 * @requires ProfileInfo
 * @requires ProfileInput
 * 
 * @state
 * @property {String} names - Nombres del usuario.
 * @property {Boolean} isLoading - Indica si la petición PATCH a la API está en curso.
 * @property {String} paternalSurname - Apellido paterno del usuario.
 * @property {String} maternalSurname - Apellido materno del usuario.
 * @property {String} age - Edad del usuario.
 * @property {String} city - Ciudad de residencia del usuario.
 * @property {String} phone - Número de teléfono del usuario.
 * @property {Boolean} editable - Indica si el formulario de edición está activo.
 * @property {Boolean} phoneError - Indica si el número de teléfono ingresado es inválido.
 * @property {String} phoneErrorMessage - Mensaje de error para el número de teléfono.
 * @property {Boolean} nameError - Indica si el nombre ingresado es inválido.
 * @property {String} nameErrorMessage - Mensaje de error para el nombre.
 * @property {Boolean} paternalSurnameError - Indica si el apellido paterno ingresado es inválido.
 * @property {String} paternalSurnameErrorMessage - Mensaje de error para el apellido paterno.
 * @property {Boolean} ageError - Indica si la edad ingresada es inválida.
 * @property {String} ageErrorMessage - Mensaje de error para la edad.
 * @property {Boolean} cityError - Indica si la ciudad ingresada es inválida.
 * @property {Boolean} isStarting - Indica si la petición GET a la API está en curso.
 * 
 * @returns {React.Component} Página de perfil de usuario.
 * 
 * @example
 * // Ejemplo de uso:
 * <Profile />
 */


const Profile = () => {
    
    const [names, setNames] = useState("Juan Carlos")
    const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    
    backendAPI.patch("/user", {names, paternalSurname, maternalSurname, age:ageNumber, city, phone: phoneNumber, countryCode: countryCodeNumber}, {headers: {"Authorization": `Bearer ${accessToken}`}}).then((response) => {
        setEditable(!editable)
        window.scrollTo(0, 0)
    }).catch((error) => {
        console.error("Error al actualizar el perfil:", error)
    }).finally(() => {
        setIsLoading(false)
    })
    
  }  

  return (
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
        <div className="flex flex-row justify-center items-center gap-[1rem]">
            <h1 className="font-montserrat text-title text-third font-bold text-center">Perfil</h1>
            {!editable &&
            <FontAwesomeIcon onClick={() => {setEditable(!editable)}} icon={faPencil } className="text-third cursor-pointer" size={"xl"} />}
            
        </div>

        <div className="flex flex-col justify-center items-left py-[3rem] px-[24rem] gap-[1rem]">
            {isStarting ? <p className="font-montserrat text-white text-title text-center">CARGANDO...</p> :editable ? 
            <form onSubmit={submitChanges}>
                <ProfileInput title={"Nombres"} content={names} setContent={setNames} type={"text"} setError={setNameError} placeholder={"Escriba su nombre"}/>
                <br/>
                {nameError && <p className="font-roboto text-red-500 text-sm font-bold">{nameErrorMessage}</p>}
                <ProfileInput title={"Apellido Paterno"} content={paternalSurname} setContent={setPaternalSurname} type={"text"} setError={setPaternalSurnameError} placeholder={"Escriba su apellido paterno"}/>
                <br/>
                {paternalSurnameError && <p className="font-roboto text-red-500 text-sm font-bold">{paternalSurnameErrorMessage}</p>}
                <ProfileInput title={"Apellido Materno"} content={maternalSurname} setContent={setMaternalSurname} type={"text"} placeholder={"Escriba su apellido materno"}/>
                <ProfileInput title={"Edad"} content={age} setContent={setAge} type={"number"} setError={setAgeError} placeholder={"Escriba su edad"}/>
                <br/>
                {ageError && <p className="font-roboto text-red-500 text-sm font-bold">{ageErrorMessage}</p>}
                <ProfileInput title={"Ciudad"} isSelect content={city} setContent={setCity} type={"text"} setError={setCityError} placeholder={"Escriba su ciudad"}/>
                <br/>
                {cityError && <p className="font-roboto text-red-500 text-sm font-bold">{cityError}</p>}

                <ProfileInput title={"Teléfono"} content={phone} setContent={setPhone} type={"phone"} setError={setPhoneError}/>
                <br/>
                {phoneError && <p className="font-roboto text-red-500 text-sm font-bold">{phoneErrorMessage}</p>}
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
            {editable && <Button disabled={isLoading}variant="contained" type="submit" className="bg-third text-primary pt-2 pb-2 mt-5 hover:bg-sixth" onClick={submitChanges}>{isLoading ? "GUARDANDO..." : "GUARDAR CAMBIOS"}</Button>}
            <Button variant="contained"  className="bg-third text-primary pt-2 pb-2 mt-5 hover:bg-sixth" onClick={() => {navigate("/")}}>VOLVER</Button>
        </div>

        

    </div>
  )
}

export default Profile