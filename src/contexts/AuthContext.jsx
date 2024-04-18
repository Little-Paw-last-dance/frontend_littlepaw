import { auth } from '../config/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    const onAuthStateChangedSelf = async (user) => {
        try {
            if (user) {
                setCurrentUser(user);
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
                logout();
                
            }
        } catch (error) {
            console.error("Error al verificar la autenticación:", error);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, onAuthStateChangedSelf);
    },[])
    return (
        <AuthContext.Provider value={{ currentUser, isAuthenticated, logout }}>
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