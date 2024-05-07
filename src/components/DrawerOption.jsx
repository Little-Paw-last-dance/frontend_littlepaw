import React from 'react'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import {useNavigate} from 'react-router-dom'

/**
 * Componente de opción de menú para el componente de DrawerMenu
 * 
 * @component
 * @param {IconDefinition} icon - Icono de FontAwesome a mostrar
 * @param {String} content - Contenido de la opción
 * @param {String} path - Ruta a la que redirigir al hacer click
 * @param {Function} action - Función a ejecutar al hacer click, solo se ejecuta si el usuario desea cerrar sesión
 * @returns {React.Component} Componente de opción de menú
 * 
 * @example
 * // Ejemplo de uso:
 * <DrawerOption icon={faPaw} content="AÑADIR MASCOTA" path="/addpet"/>
 *
 * 
 * 
 * 
 */

const DrawerOption = ({icon, content, path, action}) => {
    const navigate = useNavigate()
  return (
    <Box onClick={path !== undefined ?() => {navigate(path)} : action}sx={{direction:'row', gap:'1rem', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <FontAwesomeIcon icon={icon} size='xl' color='#6C4F1D'/>
        <Typography sx={{fontFamily:"Anybody", fontWeight:700, color:"#6C4F1D", cursor:"pointer"}} variant='h5'>
            {content}
        </Typography>
    </Box>
  )
}

export default DrawerOption