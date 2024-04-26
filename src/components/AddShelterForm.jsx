import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const customTheme = (outerTheme) =>
  createTheme({
    palette: {
      mode: outerTheme.palette.mode,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#47361A",
            "--TextField-brandBorderHoverColor": "#47361A",
            "--TextField-brandBorderFocusedColor": "#47361A",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "var(--TextField-brandBorderColor)",
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderHoverColor)",
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
    },
  });

const AddShelterForm = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); 
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const outerTheme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(''); 

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setImageUrl(imageUrl); 
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      name: event.target.names.value,
      location: event.target.location.value,
      urlPage: event.target.urlPage.value,
      phone: phoneNumber,
      countryCode: countryCode, 
      sex: selectedGender,
      photo: [imageUrl], 
    };

    try {
      const response = await backendAPI.post(
        `/shelter`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      navigate("/");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  // Función para manejar el cambio de país en el PhoneInput
  const handlePhoneChange = (value, country) => {
    setPhoneNumber(value); // Actualiza el número de teléfono
    setCountryCode(country.countryCode); // Actualiza el código de país
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <ThemeProvider theme={customTheme(outerTheme)}>
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PhoneInput
              country={'bo'}
              placeholder="Número de teléfono"
              value={phoneNumber}
              onChange={handlePhoneChange} // Usa la función handlePhoneChange
              inputStyle={{
                width: '100%',
                height: '3rem',
                fontSize: '1rem',
                backgroundColor: '#F7C677',
                borderColor: '#47361A',
              }}
              containerClass="react-tel-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* Mostrar la imagen seleccionada */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Imagen seleccionada"
                style={{ width: "100%", height: "auto", marginBottom: 10 }}
              />
            )}
            {/* Input para subir la imagen */}
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
              id="imageInput"
            />
            <label htmlFor="imageInput">
              <Button
                component="span"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#47361A",
                  color: "#F7C677",
                  paddingTop: 2,
                  paddingBottom: 2,
                  "&:hover": {
                    backgroundColor: "#705528",
                  },
                }}
              >
                {imageUrl ? "Reemplazar Imagen" : "Agregar Imagen"}
              </Button>
            </label>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#47361A",
                color: "#F7C677",
                paddingTop: 2,
                paddingBottom: 2,
                "&:hover": {
                  backgroundColor: "#705528",
                },
              }}
            >
              Agregar Refugio
            </Button>
          </Grid>
        </ThemeProvider>
      </Grid>
    </form>
  );
};

export default AddShelterForm;
