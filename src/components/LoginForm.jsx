import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { auth } from '../config/firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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
const LoginForm = () => {
  const outerTheme = useTheme();
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
      <ThemeProvider theme={customTheme(outerTheme)}>
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
        onClick={handleLogin}
      >
        Iniciar sesión
      </Button>
      </ThemeProvider>
    </Grid>
  );
};

export default LoginForm;
