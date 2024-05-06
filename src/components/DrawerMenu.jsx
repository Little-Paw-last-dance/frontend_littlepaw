import { Drawer, Typography } from '@mui/material'
import React from 'react'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { faDog } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import DrawerOption from './DrawerOption'
import { useAuth } from '../contexts/AuthContext';

const DrawerMenu = ({open, setOpen}) => {
  const {logout} = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <Drawer 
        PaperProps={{
            sx: {
                backgroundColor: '#F7E6C9',
                width: '300px',
                flexDirection: 'column',
                justifyContent: 'start',
                alignItems: 'center',
                display: 'flex',
                fontFamily: 'Anybody',
                gap: '8rem',
                padding: '2rem',

                
                
            }
        }}
    open={open} onClose={setOpen}>       
        

        <Typography sx={{fontFamily:"Anybody", fontWeight:700, color:"#6C4F1D"}} variant='h4'>
            MENÚ
        </Typography>
        <DrawerOption icon={faPaw} content="AÑADIR MASCOTA" path="/addpet"/>
        <DrawerOption icon={faDog} content="REFUGIOS" path="/shelters"/>
        <DrawerOption icon={faUser} content="PERFIL" path="/profile"/>
        <DrawerOption icon={faDoorOpen} content="CERRAR SESIÓN" action={handleLogout}/>
    </Drawer>
  )
}

export default DrawerMenu