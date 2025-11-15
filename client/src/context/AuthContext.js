import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const location = useLocation();

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

    useEffect(() => {
        const path = location.pathname;

        const isPublicRoute =
            publicRoutes.includes(path) || path.startsWith('/Reset/confirm/');//exclu la route de reset qui contient le token

        if (!isPublicRoute) {
            fetch('/auth/check', { credentials: 'include' })
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
