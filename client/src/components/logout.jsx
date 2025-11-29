import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


import '../styles/desktop/navBar.scss';
import '../styles/mobile/navBar.scss';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const LogoutButton = () => {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();



    const handleLogout = async () => {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                setUser(null); // ✅ vider le contexte
                navigate(`/LeFrontDeMer`); // ✅ redirection
            } else {
                alert('Erreur lors de la déconnexion');
            }
        } catch (err) {
            console.error('Erreur réseau :', err);
        }
    };

    return (
        <button className="btn_link" onClick={handleLogout}>
            Déconnexion
        </button>
    );
};

export default LogoutButton;
