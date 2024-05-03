import { createTheme } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
export const customTheme = (outerTheme) =>
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
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 100px #F7E6C9 inset",
                WebkitTextFillColor: "#47361A",
              }
            }
           
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
  }
  });