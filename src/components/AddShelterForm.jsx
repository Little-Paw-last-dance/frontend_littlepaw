import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

/**
 * Componente de formulario para agregar un refugio a la base de datos mediante una petición POST a la API. Exclusivo para administradores.
 * 
 * @component
 * 
 * @state
 * @property {Boolean} isLoading - Indica si la petición POST está en curso.
 * @property {String} imageUrl - URL en formato base64 de la imagen del refugio a subir.
 * @property {String} phoneNumber - Número de teléfono del refugio.
 * @property {String} countryCode - Código de país del número de teléfono del refugio.
 * @property {String} completePhoneNumber - Número de teléfono completo del refugio.
 * @property {Boolean} imageError - Indica si no se ha subido la imagen del refugio.
 * @property {Boolean} phoneError - Indica si no se ha ingresado un número de teléfono válido.
 * @property {Boolean} urlError - Indica si no se ha ingresado una URL válida para la página web del refugio.
 * 
 * @form
 * @property {String} name - Nombre del refugio.
 * @property {String} location - Ubicación del refugio.
 * @property {String} urlPage - URL de la página web del refugio.
 * @property {String} phone - Número de teléfono del refugio.
 * @property {Number} countryCode - Código de país del número de teléfono del refugio.
 * @property {String} photo - Imagen del refugio en formato base64.
 * 
 * @returns {React.Component} - Componente de formulario para agregar un refugio.
 * 
 * @example
 * // Ejemplo de uso:
 * <AddShelterForm />
 */


const AddShelterForm = () => {

  const { accessToken} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  
  const [completePhoneNumber, setCompletePhoneNumber] = useState('');
  const [imageError, setImageError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const handleImageUpload = async (event) => {
    setImageError(false);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImageUrl(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handlePhoneChange = (value, country) => {
    setPhoneError(false);
    let phone = value?.split(country?.dialCode)[1];
    setPhoneNumber(phone); 
    if (country) {
      const countryCode = country?.dialCode;
      setCountryCode(countryCode); 
      setCompletePhoneNumber(`+${countryCode}-${phone}`);
    }
  };
  const handleSubmit = async (event) => {
    let errors = 0
    event.preventDefault();
    let countryCodeNumber = parseInt(countryCode);
    if(!imageUrl) {
      setImageError(true);
      errors++;
    }
    if(phoneNumber === "undefined" || phoneNumber.length < 8){
      setPhoneError(true);
      errors++;
    }
    try{
      new URL(event.target.urlPage.value);
    } catch (error) {
      setUrlError(true);
      errors++;
    }
    if(errors > 0) return;
    const formData = {
      name: event.target.names.value,
      location: event.target.location.value,
      urlPage: event.target.urlPage.value,
      phone: phoneNumber,
      countryCode: countryCodeNumber,
      photo: imageUrl,
    };
    setIsLoading(true);
    try {
      await backendAPI.post(
        `/shelter`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/shelters");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="names"
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              inputProps={{ pattern: "[A-Za-z ]+", title: "Solo se permiten letras y espacios" }}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="location"
              label="Ubicación"
              variant="outlined"
              fullWidth
              required
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="urlPage"
              label="Página Web"
              variant="outlined"
              fullWidth
              required
              color="primary"
              onChange={() => setUrlError(false)}
            />
            {urlError && <p className="font-roboto text-red-600 text-[1rem] text-center">Debe ingresar una URL válida</p>}
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
          <Grid item xs={12} sm={6}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Imagen seleccionada"
                className="w-full h-auto mb-4"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              id="imageInput"
            />
            <label htmlFor="imageInput">
              <Button
                component="span"
                variant="contained"
                fullWidth
                className="bg-third text-sixth pt-2 pb-2 hover:bg-fourth"
              >
                {imageUrl ? "Reemplazar Imagen" : "Agregar Imagen"}
              </Button>
            </label>
            {imageError && (
              <p className="font-roboto text-red-600 text-[1rem] text-center">Debe seleccionar una imagen</p>
            )}
          </Grid>

          <Grid container spacing={4} className="mt-2 text-center pl-6">
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                className="bg-third text-sixth pt-2 pb-2 hover:bg-fourth"
                onClick={() => navigate("/shelters")}
              >
                Volver
              </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              fullWidth
              className="bg-third text-sixth pt-2 pb-2 hover:bg-fourth"
            >
              {isLoading ? "Cargando..." : "Agregar Refugio"}
            </Button>
          </Grid>
          </Grid>
      </Grid>
    </form>
  )
};

export default AddShelterForm;
