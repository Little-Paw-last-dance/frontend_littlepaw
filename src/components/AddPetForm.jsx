import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import axios from "axios"; // Importa Axios
import { backendAPI } from "../config/axiosConfig"; // Importa la URL del backend
import { useAuth } from '../contexts/AuthContext'; // Importa el contexto de autenticación
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { accessToken } = useAuth(); // Obtiene el accessToken del contexto de autenticación
  const navigate = useNavigate();


  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (!file) return; // No se seleccionó ningún archivo

    // Lee el archivo como un blob y luego conviértelo a base64
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

    const formData = {
      name: event.target.names.value,
      age: parseInt(event.target.age.value),
      sex: selectedGender,
      breed: event.target.breed.value,
      description: event.target.description.value,
      type: event.target.type.value,
      photos: imageUrls.filter((url) => url !== null),
    };

    try {
      // Utiliza Axios para hacer el POST al backend
      const response = await backendAPI.post(
        `/pet`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Agrega el token de autorización al header
          },
        }
      );
      console.log("Respuesta del servidor:", response.data);

      // Redirecciona a otra página después de completar el registro
      navigate("/");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      // Maneja el error según sea necesario
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
              backgroundColor: selectedGender === "Male" ? "#E0B46C" : "#F7D783",
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
              backgroundColor: selectedGender === "Female" ? "#E0B46C" : "#F7D783",
              color: "#FFFFFF",
            }}
          >
            Hembra
          </Button>
        </Grid>
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
                  style={{ backgroundColor: "#E0B46C", color: "#FFFFFF" }}
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
                    style={{ backgroundColor: "#E0B46C", color: "#FFFFFF" }}
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

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#E0B46C", marginTop: 10, marginBottom: 10 }}
          >
            Agregar Mascota
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPetForm;


