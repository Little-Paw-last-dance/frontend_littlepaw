import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";

const SignUpForm = () => {
  const countries = [
    { value: "1", label: "🇺🇸 +1" },
    { value: "44", label: "🇬🇧 +44" },
    { value: "52", label: "🇲🇽 +52" },
    { value: "591", label: "BO +591" },
    { value: "54", label: "AR +54" },
    { value: "55", label: "BR +55" },
    { value: "56", label: "CL +56" },
    { value: "57", label: "CO +57" },
    { value: "58", label: "VE +58" },
    { value: "593", label: "EC +593" },
    { value: "595", label: "PY +595" },
    { value: "598", label: "UY +598" },
    { value: "595", label: "PY +595" },
    { value: "507", label: "PA +507" },
    { value: "51", label: "PE +51" },
    // Agrega más países según sea necesario
  ];

  const [formData, setFormData] = useState({
    names: "",
    paternalSurname: "",
    maternalSurname: "",
    email: "",
    city: "",
    password: "",
    confirmPassword: "",
    countryCode: 0,
    phone: 0,
    age: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Convertir el valor a número si es el campo age, countryCode o phone
    let updatedValue = value;
    if (name === "age" || name === "countryCode" || name === "phone") {
      updatedValue = parseInt(value, 10);
    }
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
      setFormData({
        names: "",
        paternalSurname: "",
        maternalSurname: "",
        email: "",
        city: "",
        password: "",
        confirmPassword: "",
        countryCode: 591,
        phone: 0,
        age: 0,
      });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

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
            value={formData.name}
            onChange={handleChange}
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="location"
            label="Ubicación"
            variant="outlined"
            fullWidth
            required
            value={formData.location}
            onChange={handleChange}
          />
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
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            name="countryCode"
            select
            label="Código de País"
            variant="outlined"
            fullWidth
            required
            value={formData.countryCode}
            onChange={handleChange}
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            name="phone"
            type="number"
            label="Número de Teléfono"
            variant="outlined"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
            color="primary" // Cambia el color del texto al tocar
            focused // Establece el enfoque al tocar
            InputLabelProps={{
              style: { color: "#E0B46C" }, // Cambia el color de la etiqueta al tocar
            }}
          />
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
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            className="bg-yellow-300 text-white"
            fullWidth
            style={{ backgroundColor: "#E0B46C", marginTop: 15 }}
          >
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
