import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { getAllCountries } from 'countries-and-timezones';

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
  const [countries, setCountries] = useState([]);
  const [completePhoneNumber, setCompletePhoneNumber] = useState('');
  const [imageError, setImageError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    const allCountries = getAllCountries();
    const countriesArray = Object.values(allCountries).map((country) => ({
      name: country.name,
      code: country.countryCallingCodes && country.countryCallingCodes[0] ? country.countryCallingCodes[0] : '', 
    }));
    setCountries(countriesArray);
  }, []);

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
    if(errors > 0) return;
    const formData = {
      name: event.target.names.value,
      location: event.target.location.value,
      urlPage: event.target.urlPage.value,
      phone: phoneNumber,
      countryCode: countryCodeNumber,
      photo: imageUrl,
    };
    console.log(formData);
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
              value={completePhoneNumber}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                height: '3rem',
                fontSize: '1rem',
                backgroundColor: '#F7C677',
                borderColor: '#47361A',
              }}
              buttonStyle={{backgroundColor: "#F7C677",borderColor: "#47361A"}}
              dropdownStyle={{backgroundColor: "#F7C677", borderColor: "#47361A", }}
              containerClass="react-tel-input"
            />
            {phoneError && (
              <p style={{ color: 'red', fontSize: '1rem', textAlign:'center' }}>
                Debe ingresar un número de teléfono válido
              </p>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Imagen seleccionada"
                style={{ width: "100%", height: "auto", marginBottom: 10 }}
              />
            )}
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
            {imageError && (
              <p style={{ color: 'red', fontSize: '1rem' }}>Debe seleccionar una imagen</p>
            )}
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
