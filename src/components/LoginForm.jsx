import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const LoginForm = () => {
  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <TextField label="Correo electrónico" variant="outlined" fullWidth InputLabelProps={{ className: 'custom-input-label' }} />
      <TextField label="Contraseña" variant="outlined" type="password" fullWidth InputLabelProps={{ className: 'custom-input-label' }} style={{ marginTop: 15 }}/>
      <Button variant="contained" className="bg-yellow-300 text-white" fullWidth style={{ backgroundColor: '#E0B46C', marginTop: 15 }}>
        Iniciar sesión
      </Button>
      
    </Grid>
  );
};

export default LoginForm;
