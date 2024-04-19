import { TextField } from '@mui/material'
import React from 'react'
import PhoneInput from 'react-phone-input-2'


const ProfileInput = ({title, content, setContent, type, setError, placeholder}) => {
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
        <label htmlFor={title} className="text-[2rem] text-secondary">{title}:</label>
        { type === "phone" ? 
        <PhoneInput 

            specialLabel={""} 
            onChange={(e,phone) => handlePhone(e,phone)}
            prefix='+'
            country={"bo"}
            value={content}
            buttonStyle={{backgroundColor: "#F7D783", borderWidth: "3px", borderColor: "white"}}
            dropdownStyle={{backgroundColor: "#F7D783", borderWidth: "3px", borderColor: "white", }}
            inputStyle={{backgroundColor: "#F7D783", borderWidth: "3px", borderColor: "white", height: "3rem", fontSize: "1rem"}}
            />:
        <TextField placeholder={placeholder} type={type} sx={{"& .MuiOutlinedInput-root": {"&.MuiInputBase-root fieldset": {borderColor: "white", borderWidth:"3px"}}}} id="standard" inputProps={{id: title, style:{fontFamily:"Roboto", fontWeight:700}}} variant="outlined" value={content} onChange={handleInputChanges}/>
        
        }
    </div>
  )
}

export default ProfileInput