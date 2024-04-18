import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { auth } from '../config/firebaseConfig'; // Importa la instancia de autenticación de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password); 
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
      <TextField
        label="Correo electrónico"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: 15 }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button
        variant="contained"
        className="bg-yellow-300 text-white"
        fullWidth
        style={{ backgroundColor: '#E0B46C', marginTop: 15 }}
        onClick={handleLogin}
      >
        Iniciar sesión
      </Button>
    </Grid>
  );
};

export default LoginForm;
