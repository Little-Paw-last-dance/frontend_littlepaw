import { MenuItem, TextField } from '@mui/material'
import React from 'react'
import PhoneInput from 'react-phone-input-2'
import { boliviaCities } from '../models/bolivianCities'


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
        
        <label htmlFor={title} className="font-roboto text-[2rem] text-third">{title}:</label>
        { type === "phone" ? 
        <PhoneInput
            specialLabel={""} 
            onChange={(e,phone) => handlePhone(e,phone)}
            prefix='+'
            country={"bo"}
            value={content}
            buttonStyle={{backgroundColor: "#F7C677", borderWidth: "3px", borderColor: "#47361A"}}
            dropdownStyle={{backgroundColor: "#F7C677", borderWidth: "3px", borderColor: "#47361A", }}
            inputStyle={{backgroundColor: "#F7C677", borderWidth: "3px", borderColor: "#47361A", height: "3rem", fontSize: "1rem", fontWeight:700}}
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