import React from 'react'
import Typography from '@mui/material/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import {useNavigate} from 'react-router-dom'

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