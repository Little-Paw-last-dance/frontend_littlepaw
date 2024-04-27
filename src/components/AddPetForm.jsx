import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
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
const AddPetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderError, setGenderError] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageError, setImageError] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const outerTheme = useTheme();

  const handleGenderSelect = (gender) => {
    setGenderError(false);
    setSelectedGender(gender);
  };

  const handleImageUpload = async (event, index) => {
    setImageError(false);
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      const updatedImageUrls = [...imageUrls];
      updatedImageUrls[index] = imageUrl;
      setImageUrls(updatedImageUrls);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = null;
    setImageUrls(updatedImageUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let errors = 0

    if (!selectedGender) {
      setGenderError(true);
      errors++;

    }
    if(imageUrls.length === 0){
      setImageError(true);
      errors++;
    }
    if (errors > 0) return;


    const formData = {
      name: event.target.names.value,
      age: parseInt(event.target.age.value),
      sex: selectedGender,
      breed: event.target.breed.value,
      description: event.target.description.value,
      type: event.target.type.value,
      photos: imageUrls.filter((url) => url !== null),
    };
    setIsLoading(true);

    try {
      await backendAPI.post(
        `/pet`,
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

    } finally {
      setIsLoading(false);
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
              name="age"
              label="Edad"
              variant="outlined"
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="description"
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              required
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="type"
              label="Tipo"
              variant="outlined"
              fullWidth
              select
              required
            >
              <MenuItem value="dog">Perro</MenuItem>
              <MenuItem value="cat">Gato</MenuItem>
              <MenuItem value="bird">Ave</MenuItem>
              <MenuItem value="bunny">Conejo</MenuItem>
              <MenuItem value="reptile">Reptil</MenuItem>
              <MenuItem value="other">Otro</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="breed"
              label="Raza"
              variant="outlined"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h7" gutterBottom>
              Seleccione el sexo de la mascota
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              onClick={() => handleGenderSelect("Male")}
              style={{
                backgroundColor: selectedGender === "Male" ? "#47361A" : "#AD833E",
                color: "#FFFFFF",
              }}
            >
              Macho
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              onClick={() => handleGenderSelect("Female")}
              style={{
                backgroundColor: selectedGender === "Female" ? "#47361A" : "#AD833E",
                color: "#FFFFFF",
              }}
            >
              Hembra
            </Button>
          </Grid>
          <Grid item xs={12}>

            {genderError && <p style={{ color: 'red', fontSize: '1rem', textAlign: 'center' }}>
              Debe seleccionar el sexo de la mascota
            </p>}</Grid>

          {[0, 1, 2].map((index) => (
            <Grid item xs={12} sm={4} key={index}>
              {imageUrls[index] ? (
                <>
                  <img
                    src={imageUrls[index]}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100%", height: "auto", marginBottom: 5 }}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      backgroundColor: "#47361A",
                      color: "#F7C677",
                      paddingTop: 2,
                      paddingBottom: 2,
                      "&:hover": {
                        backgroundColor: "#705528", // Cambia el color al colocar el mouse sobre el botón
                      },
                    }}
                  >
                    Seleccionar otra imagen
                  </Button>
                </>
              ) : (
                <>
                  <label htmlFor={`imageUpload-${index}`}>
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
                          backgroundColor: "#705528", // Cambia el color al colocar el mouse sobre el botón
                        },
                      }}
                    >
                      Subir Imagen {index + 1}
                    </Button>
                  </label>
                  <input
                    id={`imageUpload-${index}`}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </>
              )}
            </Grid>
          ))}
          {imageError && (
            <Grid item xs={12}>
              <p style={{ color: 'red', fontSize: '1rem', textAlign: 'center' }}>
                Debe subir al menos una imagen
              </p>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
            disabled={isLoading}
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
              {isLoading ? 'Cargando...' : 'Agregar Mascota'}
            </Button>
          </Grid>
        </ThemeProvider>
      </Grid>
    </form>
  );
};

export default AddPetForm;


