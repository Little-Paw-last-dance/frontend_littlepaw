import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Correo electrónico o contraseña incorrectos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Grid container direction="column" spacing={3} alignItems="center">
        <form className="w-full" onSubmit={handleLogin}>
          <TextField
            label="Correo electrónico"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={
              (e) => {
                setError(null);
                setEmail(e.target.value)
              }}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => {
              setError(null);
              setPassword(e.target.value)
            }}
            style={{ marginTop: 15 }}
          />
          {error && <p className="text-red-600 text-[1rem] text-center">{error}</p>}
        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#47361A",
            color: "#F7C677",
            paddingTop: 2,
            paddingBottom: 2,
            marginTop: 5,
            "&:hover": {
              backgroundColor: "#705528",

            },
          }}
          
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
        </form>
    </Grid>
  );
};

export default LoginForm;
