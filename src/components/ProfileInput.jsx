import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import { boliviaCities } from '../models/bolivianCities'

/**
 * Componente que muestra un input de perfil, con un título y un contenido editable.
 * 
 * @component
 * 
 * @param {String} title - Título del input de perfil.
 * @param {String} content - Contenido del input de perfil.
 * @param {Function} setContent - Función para modificar el contenido del input de perfil.
 * @param {String} type - Tipo de input de perfil, puede ser "text" o "phone".
 * @param {Function} setError - Función para modificar el estado de error del input de perfil.
 * @param {String} placeholder - Placeholder del input de perfil.
 * @param {Boolean} isSelect - Indica si el input de perfil es un select.
 * 
 * @returns {React.Component} - Componente de input de perfil.
 * 
 * @example
 * // Ejemplo de uso:
 * <ProfileInput title="Nombre" content="Juan Pérez" setContent={setContent} type="text" setError={setError} placeholder="Escribe tu nombre..." isSelect={false} />
 * 
 */

const ProfileInput = ({title, content, setContent, type, setError, placeholder, isSelect}) => {
    
    const handlePhone = (e,value) => {
        let phone = e?.split(value?.dialCode)[1]
        setContent(`+${value?.dialCode}-${phone}`)
    }
    const handleInputChanges = (e) => {
        if(e.target.value.match(/\d/) && type === "text") return
        setContent(e.target.value)
        if(setError) {
            setError(false)
        }

        
    }
  return (
    <div className="flex flex-col gap-[1rem] font-bold mt-[1rem]">
        
        <label htmlFor={title} className="font-roboto text-[2rem] text-fifth">{title}:</label>
        { type === "phone" ? 
        <PhoneInput
            specialLabel={""} 
            onChange={(e,phone) => handlePhone(e,phone)}
            prefix='+'
            country={"bo"}
            value={content}
            buttonStyle={{backgroundColor: "#F7E6C9", borderWidth: "3px", borderColor: "#47361A"}}
            dropdownStyle={{backgroundColor: "#F7E6C9", borderWidth: "3px", borderColor: "#47361A", }}
            inputStyle={{backgroundColor: "#F7E6C9", borderWidth: "3px", borderColor: "#47361A", height: "3rem", fontSize: "1rem", fontWeight:700}}
            />:
        <TextField select={isSelect} placeholder={placeholder} type={type} 
        sx={{"& .MuiOutlinedInput-root": {"&.MuiInputBase-root fieldset": {borderColor: "secondary", borderWidth:"3px"}}}} id="standard" SelectProps={isSelect ?{id: title, style:{fontFamily:"Montserrat", fontWeight:700}, MenuProps:{MenuListProps:{style:{fontFamily:"Montserrat", fontWeight:700}}}} : {}}inputProps={{id: title, style:{fontFamily:"Montserrat", fontWeight:700}}} variant="outlined" value={content} onChange={handleInputChanges}>{
            isSelect && boliviaCities.map((city) => {
                return <MenuItem key={city.value} value={city.value}>{city.label}</MenuItem>
            })
        }</TextField>
        }
    </div>
  )
}

export default ProfileInput