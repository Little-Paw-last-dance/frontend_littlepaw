import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const MainPage = () => {
    const {logout, currentUser} = useAuth()
  return (
    <>
        <p>Bienvenido {currentUser?.displayName}</p>
        <button onClick={logout}>Cerrar sesión</button>
    </>
  )
}

export default MainPage