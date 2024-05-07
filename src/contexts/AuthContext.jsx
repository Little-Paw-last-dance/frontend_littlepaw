import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged, signOut, onIdTokenChanged, updateProfile } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Contexto de autenticación, provee información del usuario autenticado y funciones para cerrar sesión en todos los componentes de la aplicación.
 * 
 * @context
 * 
 * @param {Object} children - Componentes hijos de la aplicación.
 * 
 * @state
 * @property {Object} currentUser - Información completa del usuario autenticado.
 * @property {Boolean} isAuthenticated - Indica si el usuario está autenticado.
 * @property {String} accessToken - Token de acceso del usuario autenticado.
 * @property {Function} logout - Función para cerrar sesión del usuario autenticado.
 * 
 * @returns {React.Context} Contexto de autenticación.
 * 
 * @example
 * // Ejemplo de uso:
 * const { currentUser, isAuthenticated, logout, accessToken } = useAuth();
 */

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [accessToken, setAccessToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            setAccessToken("");
            setIsAuthenticated(false);
            navigate('/welcome');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    const updateDisplayName = async (name) => {
        try {
            await updateProfile(currentUser,{
                displayName: name
            });
        } catch (error) {
            console.error("Error al actualizar el nombre de usuario:", error);
        }
    }

    const onAuthStateChangedSelf = async (user) => {
        try {
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
                setAccessToken(await user.getIdToken());
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
                setAccessToken("");
                logout();
                
            }
        } catch (error) {
            console.error("Error al verificar la autenticación:", error);
        }
    }

    const onIdTokenChangedSelf = async (user) => {
        if(user) {
          const token = await user.getIdToken();
          setAccessToken(token);
          setIsAuthenticated(true);
        } else {
          setAccessToken("");
          setIsAuthenticated(false);
        }
      }
    

    useEffect(() => {
        onAuthStateChanged(auth, onAuthStateChangedSelf);
        onIdTokenChanged(auth, onIdTokenChangedSelf);
    
    },[])
    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, logout, accessToken, updateDisplayName }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
}