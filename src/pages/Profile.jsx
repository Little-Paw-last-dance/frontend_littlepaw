import React, {useState, useEffect} from 'react'
import ProfileInfo from '../components/ProfileInfo'
import ProfileInput from '../components/ProfileInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'



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

    useEffect(() => {
        
        const sampleData = {
            email: "example@gmail.com",
            names: "Juan Carlos",
            paternalSurname: "Pérez",
            maternalSurname: "García",
            age: "25",
            city: "CDMX",
            countryCode: "52",
            phone: "75845512"
        }
        setNames(sampleData.names)
        setPaternalSurname(sampleData.paternalSurname)
        setMaternalSurname(sampleData.maternalSurname)
        setAge(sampleData.age)
        setCity(sampleData.city)
        setPhone(`+${sampleData.countryCode}-${sampleData.phone}`)
    },[])

  const submitChanges = () => {
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
    setEditable(!editable)
  }  

  return (
    <div className="bg-primary flex flex-col min-h-screen pt-[2rem] px-[2rem] pb-[10rem]">
        <div className="flex flex-row justify-center items-center gap-[1rem]">
            <h1 className="font-anybody text-title text-white font-bold text-center">Perfil</h1>
            <FontAwesomeIcon onClick={submitChanges} icon={editable ? faCheck : faPencil } className="text-white cursor-pointer" size={"xl"} />
            
        </div>
        <div className="flex flex-col justify-center items-left py-[3rem] px-[24rem] gap-[4rem]">
            {editable ? 
            <form>
                <ProfileInput title={"Nombres"} content={names} setContent={setNames} type={"text"} setError={setNameError}/>
                <br/>
                {nameError && <p className="text-red-500 text-sm font-bold">{nameErrorMessage}</p>}
                <ProfileInput title={"Apellido Paterno"} content={paternalSurname} setContent={setPaternalSurname} type={"text"} setError={setPaternalSurnameError}/>
                <br/>
                {paternalSurnameError && <p className="text-red-500 text-sm font-bold">{paternalSurnameErrorMessage}</p>}
                <ProfileInput title={"Apellido Materno"} content={maternalSurname} setContent={setMaternalSurname} type={"text"}/>
                <ProfileInput title={"Edad"} content={age} setContent={setAge} type={"number"} setError={setAgeError}/>
                <br/>
                {ageError && <p className="text-red-500 text-sm font-bold">{ageErrorMessage}</p>}
                <ProfileInput title={"Ciudad"} content={city} setContent={setCity} type={"text"} setError={setCityError}/>
                <br/>
                {cityError && <p className="text-red-500 text-sm font-bold">{cityError}</p>}

                <ProfileInput title={"Teléfono"} content={phone} setContent={setPhone} type={"phone"} setError={setPhoneError}/>
                <br/>
                {phoneError && <p className="text-red-500 text-sm font-bold">{phoneErrorMessage}</p>}
            </form>
            : <>
            <ProfileInfo title={"Nombres"} content={names}/>
            <ProfileInfo title={"Apellido Paterno"} content={paternalSurname}/>
            <ProfileInfo title={"Apellido Materno"} content={maternalSurname}/>
            <ProfileInfo title={"Edad"} content={age} />
            <ProfileInfo title={"Ciudad"} content={city}/>
            <ProfileInfo title={"Teléfono"} content={phone}/>
            </>
            }
            

        </div>

    </div>
  )
}

export default Profile