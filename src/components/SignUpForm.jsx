import React from 'react';
import { Grid, TextField, Button, MenuItem } from '@mui/material';

const SignUpForm = () => {
  const countries = [
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+52', label: '🇲🇽 +52' },
    // Agrega más países según sea necesario
  ];

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nombre" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido Paterno" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Apellido Materno" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Correo electrónico" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Ubicación" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Contraseña" variant="outlined" type="password" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Repetir Contraseña" variant="outlined" type="password" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField select label="Código de País" variant="outlined" fullWidth required>
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Número de Teléfono" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField type="number" label="Edad" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12}>
        <Button variant="contained" className="bg-yellow-300 text-white" fullWidth style={{ backgroundColor: '#E0B46C', marginTop: 15 }}>
            Registrarse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignUpForm;