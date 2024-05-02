import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { auth } from '../config/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de formulario para iniciar sesión en la aplicación con un correo electrónico y una contraseña, mediante una petición a Firebase Authentication.
 * 
 * @component
 * 
 * @state
 * @property {String} email - Correo electrónico del usuario.
 * @property {String} password - Contraseña del usuario.
 * @property {String} error - Mensaje de error al iniciar sesión.
 * @property {Boolean} isLoading - Indica si la petición de inicio de sesión está en curso.
 * 
 * @returns {React.Component} - Componente de formulario para iniciar sesión.
 * 
 * @example
 * // Ejemplo de uso:
 * <LoginForm />
 */

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
            className="mt-5"
          />
          {error && <p className="font-roboto text-red-600 text-[1rem] text-center">{error}</p>}
        <Button
          disabled={isLoading}
          variant="contained"
          type="submit"
          fullWidth
          className="bg-third text-primary pt-2 pb-2 hover:bg-sixth mt-5"
          
          
        >
          {isLoading ? 'Cargando...' : 'Iniciar sesión'}
        </Button>
        </form>
    </Grid>
  );
};

export default LoginForm;
