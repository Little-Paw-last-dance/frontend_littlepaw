import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem, Typography } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const AddPetForm = ({isAdmin}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderError, setGenderError] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageError, setImageError] = useState(false);
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
 
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
      let path = isAdmin ? `/shelter/${id}/pet` : '/pet';
      
      await backendAPI.post(
        path,
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
              <MenuItem value="rabbit">Conejo</MenuItem>
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
            <Typography variant="h7" gutterBottom className="font-roboto">
              Seleccione el sexo de la mascota
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              onClick={() => handleGenderSelect("Male")}
              className={selectedGender === "Male" ? "bg-third text-white" : "bg-fifth text-white"}
              
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
              className={selectedGender === "Female" ? "bg-third text-white" : "bg-fifth text-white"}
            >
              Hembra
            </Button>
          </Grid>
          <Grid item xs={12}>

            {genderError && <p className="font-roboto text-red-600 text-[1rem] text-center">
              Debe seleccionar el sexo de la mascota
            </p>}</Grid>

          {[0, 1, 2].map((index) => (
            <Grid item xs={12} sm={4} key={index}>
              {imageUrls[index] ? (
                <>
                  <img
                    src={imageUrls[index]}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto mb-5"
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleRemoveImage(index)}
                    className="bg-third text-primary pt-2 pb-2 hover:bg-sixth"
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
                      className="bg-third text-primary pt-2 pb-2 hover:bg-sixth"
                    >
                      Subir Imagen {index + 1}
                    </Button>
                  </label>
                  <input
                    id={`imageUpload-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </>
              )}
            </Grid>
          ))}
          {imageError && (
            <Grid item xs={12}>
              <p className="font-roboto text-red-600 text-[1rem] text-center">
                Debe subir al menos una imagen
              </p>
            </Grid>
          )}

        <Grid container spacing={4} className="mt-2 text-center pl-6">
          <Grid item xs={12} sm={6}>
          <Button variant="contained" fullWidth className="bg-third text-primary pt-2 pb-2 hover:bg-sixth" onClick={
            isAdmin ? () => navigate(`/shelters/${id}`) : () => navigate("/")
          }> 
              VOLVER
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
            disabled={isLoading}
              type="submit"
              variant="contained"
              fullWidth
             
              className="bg-third text-primary pt-2 pb-2 hover:bg-sixth"
            >
              {isLoading ? 'Cargando...' : 'Agregar Mascota'}
            </Button>

          </Grid>
          </Grid>
      </Grid>
    </form>
  );
};

export default AddPetForm;


