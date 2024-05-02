import React, {useEffect, useState} from 'react'
import { backendAPI } from '../config/axiosConfig'
import { useAuth } from '../contexts/AuthContext'
import {
    Navigate,
    Outlet,
  } from 'react-router-dom';

/**
 * Componente de ruta privada para componentes exclusivos de administradores. Todas las rutas que requieran roles de administrador deben estar protegidas por este componente.
 * 
 * @component
 * 
 * @state
 * @property {Boolean} isStarting - Indica si la petición GET a la API para obtener los roles de usuario está en curso.
 * @property {Array} roles - Roles de usuario obtenidos de la API.
 * 
 * @returns {React.Component} Componente de ruta privada.
 * 
 * @example
 * // Ejemplo de uso:
 * <PrivateRoute>
 *   <Component />
 * </PrivateRoute>
 *
 * 
 */  

const PrivateRoute = () => {
    const { accessToken, logout } = useAuth()
    const [isStarting, setIsStarting] = useState(true)
    const [roles, setRoles] = useState([])
    const returnToWelcome = () => {
        logout().then(() => {
            return <Navigate to="/welcome" replace/>
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error)
        }).finally(() => {
            return <Navigate to="/welcome" replace/>
        })
    }
    useEffect(() => {
        backendAPI.get("/user", {headers: {"Authorization": `Bearer ${accessToken}`}}).then((response) => {
            let roles = response.data.user.roles.map((role) => role.name)
            setRoles(roles)
        }).catch((error) => {
            console.error(`Hubo un error al obtener los roles de usuario: ${error}`)
        }).finally(() => {
            setIsStarting(false)
        })
    },[accessToken])
    if(roles.length > 0 && !roles.includes("admin")) {
        return returnToWelcome()
    }
    if(isStarting) return (
        <div className="bg-primary min-h-screen flex flex-col justify-center items-center">
            <p className="font-montserrat text-title text-third font-bold text-center">CARGANDO...</p>
        </div>
    )
    return (
        <Outlet />
    )
    
    

  
}

export default PrivateRoute