import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const AddPetForm = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (!file) return; // No se seleccionó ningún archivo

    // Aquí puedes agregar lógica para subir la imagen al servidor o procesarla
    // En este ejemplo, solo actualizamos la URL de la imagen en el estado
    const imageUrl = URL.createObjectURL(file);
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = imageUrl;
    setImageUrls(updatedImageUrls);
  };

  const handleRemoveImage = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls[index] = null; // Remover la imagen en el índice especificado
    setImageUrls(updatedImageUrls);
  };

  return (
    <form>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <TextField
            name="names"
            label="Nombre"
            variant="outlined"
            fullWidth
            required
            inputProps={{ pattern: "[A-Za-z ]+", title: "Solo se permiten letras y espacios" }}
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
        <Grid item xs={12} sm={6}>
          <Button
            type="button"
            variant="contained"
            fullWidth
            onClick={() => handleGenderSelect("male")}
            style={{
              backgroundColor: selectedGender === "male" ? "#E0B46C" : "#F7D783",
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
            onClick={() => handleGenderSelect("female")}
            style={{
              backgroundColor: selectedGender === "female" ? "#E0B46C" : "#F7D783",
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
              <img src={imageUrls[index]} alt={`Image ${index + 1}`} style={{ width: "100%", height: "auto", marginBottom: 5 }} />
              <Button variant="contained" fullWidth onClick={() => handleRemoveImage(index)}
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
                  style={{ backgroundColor: "#E0B46C", color: "#FFFFFF"}}
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
            className="bg-yellow-300 text-white"
            fullWidth
            style={{ backgroundColor: "#E0B46C", marginTop: 10, marginBottom: 10}}
          >
            Agregar Mascota
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPetForm;
