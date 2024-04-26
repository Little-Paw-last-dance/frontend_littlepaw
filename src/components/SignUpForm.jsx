import React, { useState } from "react";
import { Grid, TextField, Button, MenuItem } from "@mui/material";
import { backendAPI } from "../config/axiosConfig";
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
const SignUpForm = () => {
  const outerTheme = useTheme();
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
  ];

  const boliviaCities = [
    { value: "Santa Cruz", label: "Santa Cruz" },
    { value: "La Paz", label: "La Paz" },
    { value: "Cochabamba", label: "Cochabamba" },
    { value: "Sucre", label: "Sucre" },
    { value: "Tarija", label: "Tarija" },
    { value: "Potosí", label: "Potosí" },
    { value: "Oruro", label: "Oruro" },
    { value: "Beni", label: "Beni" },
    { value: "Pando", label: "Pando" },
  ];

  const [formData, setFormData] = useState({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    let updatedValue = value;

    if (name === "age" || name === "countryCode" || name === "phone") {
      updatedValue = parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await backendAPI.post("/user", formData, {
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
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <ThemeProvider theme={customTheme(outerTheme)}>
          <Grid item xs={12} sm={4}>
            <TextField
              name="names"
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              value={formData.names}
              onChange={handleChange}
              inputProps={{
                pattern: "[A-Za-z ]+",
                title: "Solo se permiten letras y espacios",
              }}
              color="primary"
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
              label="Número de Teléfono"
              variant="outlined"
              fullWidth
              required
              value={formData.phone}
              onChange={handleChange}
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
        </ThemeProvider>
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
                backgroundColor: "#705528", // Cambia el color al colocar el mouse sobre el botón
              },
            }}
          >
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;
