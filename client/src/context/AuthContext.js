import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AuthContext = createContext();

// Définir les routes publiques en dehors du composant
const publicRoutes = [
    '/',
    '/SeConnecter',
    '/Sinscrire',
    '/LeFrontDeMer',
    '/Apropos',
    '/Carte',
    '/Confidentialites',
    '/Contact',
    '/Reset/request',
    '/Reset/confirm'
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        const isPublicRoute =
            publicRoutes.includes(path) || path.startsWith(`/Reset/confirm/`);

        if (!isPublicRoute) {
            fetch(`${API_URL}/auth/check`, { credentials: 'include' })
                .then(res => {
                    if (!res.ok) throw new Error('Aucun utilisateur connecté');
                    return res.json();
                })
                .then(data => {
                    if (data.user) setUser(data.user);
                    else setUser(null);
                })
                .catch(() => setUser(null));
        }
    }, [location.pathname]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

