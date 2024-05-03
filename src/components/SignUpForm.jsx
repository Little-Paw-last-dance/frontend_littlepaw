import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import PhoneInput from 'react-phone-input-2';
import { boliviaCities } from "../models/bolivianCities";

/**
 * Componente de formulario para registrarse en la aplicación mediante una petición POST a la API.
 * 
 * @component
 * 
 * @state
 * @property {Object} formData - Objeto con los datos del formulario de registro.
 * @property {Boolean} isLoading - Indica si la petición POST está en curso.
 * @property {Boolean} matchPasswordError - Indica si las contraseñas no coinciden.
 * @property {String} completePhoneNumber - Número de teléfono completo del usuario.
 * @property {Boolean} phoneError - Indica si no se ha ingresado un número de teléfono válido.
 * @property {Boolean} generalError - Indica si ha ocurrido un error al enviar el formulario.
 * 
 * @form
 * @property {String} names - Nombres del usuario.
 * @property {String} paternalSurname - Apellido paterno del usuario.
 * @property {String} maternalSurname - Apellido materno del usuario.
 * @property {String} email - Correo electrónico del usuario.
 * @property {String} city - Ciudad de residencia del usuario.
 * @property {String} password - Contraseña del usuario.
 * @property {String} confirmPassword - Confirmación de la contraseña del usuario.
 * @property {Number} countryCode - Código de país del número de teléfono del usuario.
 * @property {String} phone - Número de teléfono del usuario.
 * @property {Number} age - Edad del usuario.
 * 
 * @returns {React.Component} - Componente de formulario de registro.
 * 
 * @example
 * // Ejemplo de uso:
 * <SignUpForm />
 */

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    names: "",
    paternalSurname: "",
    maternalSurname: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
    countryCode: 591,
    phone: "",
    age: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [matchPasswordError, setMatchPasswordError] = useState(false);
  const [completePhoneNumber, setCompletePhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [generalError, setGeneralError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;
    if (name === "age" || name === "countryCode" || name === "phone") {
      updatedValue = parseInt(value, 10);
    }
    if(name === "confirmPassword") {
      setMatchPasswordError(false);
    }
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handlePhoneChange = (value, country) => {
    setPhoneError(false);
    let phone = value?.split(country?.dialCode)[1];
    let newFormData = {...formData, phone: phone}
    setFormData(newFormData); 
    if (country) {
      const countryCode = country?.dialCode;
      setFormData({...newFormData, countryCode: parseInt(countryCode)});
      setCompletePhoneNumber(`+${countryCode}-${phone}`);
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = 0;
    if (formData.password !== formData.confirmPassword) {
      setMatchPasswordError(true);
      errors++;
    }
    if(formData.phone=== "undefined" || formData.phone.length < 8){
      setPhoneError(true);
      errors++;
    }
    if (errors > 0) return;
    setIsLoading(true);
    try {
      await backendAPI.post("/user", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setFormData({
        names: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        city: "",
        password: "",
        confirmPassword: "",
        countryCode: "",
        phone: "",
        age: 0,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setGeneralError(true);
    } finally {
      setIsLoading(false);
    }
    
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="names"
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              value={formData.names}
              onChange={handleChange}
              text="Montserrat, sans-serif"
              inputProps={{
                pattern: "[A-Za-z ]+",
                title: "Solo se permiten letras y espacios",
                fontFamily: "Montserrat, sans-serif",
              }}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="paternalSurname"
              label="Apellido Paterno"
              variant="outlined"
              fullWidth
              required
              value={formData.paternalSurname}
              onChange={handleChange}
              inputProps={{
                pattern: "[A-Za-z ]+",
                title: "Solo se permiten letras y espacios",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="maternalSurname"
              label="Apellido Materno"
              variant="outlined"
              fullWidth
              required
              value={formData.maternalSurname}
              onChange={handleChange}
              inputProps={{
                pattern: "[A-Za-z ]+",
                title: "Solo se permiten letras y espacios",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Correo electrónico"
              variant="outlined"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
      name="city"
      select
      label="Ciudad"
      variant="outlined"
      fullWidth
      required
      value={formData.city}
      onChange={handleChange}
      MenuProps={{
        PaperProps: {
          style: {
            marginTop: 0,
            marginBottom: 0,
          },
        },
      }}
    >
      {boliviaCities.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              inputProps={{
                pattern: ".{8,}",
                title: "La contraseña debe tener al menos 8 caracteres",
                
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="confirmPassword"
              label="Repetir Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {matchPasswordError && (
              <p className="font-roboto text-red-600 text-[1rem] text-center">
                Las contraseñas no coinciden
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
          <PhoneInput
              country={'bo'}
              placeholder="Número de teléfono"
              value={completePhoneNumber}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                height: '3rem',
                fontSize: '1rem',
                backgroundColor: '#F7E6C9',
                borderColor: '#47361A',
              }}
              buttonStyle={{backgroundColor: "#F7E6C9",borderColor: "#47361A"}}
              dropdownStyle={{backgroundColor: "#F7E6C9", borderColor: "#47361A", }}
              containerClass="react-tel-input"
            />
            {phoneError && (
              <p className="font-roboto text-red-600 text-[1rem] text-center">
                Debe ingresar un número de teléfono válido
              </p>
            )}
            
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              name="age"
              type="number"
              label="Edad"
              variant="outlined"
              fullWidth
              required
              value={formData.age}
              onChange={handleChange}
              fontFamily="Montserrat, sans-serif"
            />
          </Grid>
        <Grid item xs={12}>
          {generalError && (
            <p className="font-roboto text-red-600 text-[1rem] text-center">
              Hubo un error al enviar el formulario
            </p>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            fullWidth
            className="bg-third text-sixth pt-2 pb-2 hover:bg-fourth"
          >
            {isLoading ? "Enviando..." : "Registrarse"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
