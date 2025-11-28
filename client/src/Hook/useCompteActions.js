import { useState, useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Hook personnalisé pour gérer toutes les réservations côté admin
const useReservations = () => {
    // Récupération de l'utilisateur connecté via le contexte
    const { user, setUser } = useContext(AuthContext);

    // État principal contenant toutes les réservations
    const [reservations, setReservations] = useState([]);

    // Nombre de réservations visibles (pagination progressive)
    const [visibleCount, setVisibleCount] = useState(20);

    // Mois sélectionné pour filtrer les réservations passées
    const [selectedMonth, setSelectedMonth] = useState("");

    // Onglet actif dans l'interface admin
    const [activeTab, setActiveTab] = useState("attente");



    // Fonction pour charger 20 réservations supplémentaires
    const handleLoadMore = () => setVisibleCount(prev => prev + 20);




    // 🔍 Filtrage des réservations en attente
    const reservationsEnAttente = useMemo(() =>
        reservations.filter(res => res.etat === "en attente"), [reservations]);




    // 🔮 Filtrage des réservations futures (acceptées uniquement), triées par date croissante
    const reservationsFutures = useMemo(() =>
        reservations
            .filter(res => new Date(res.date) > new Date() && res.etat === "acceptée")
            .sort((a, b) => new Date(a.date) - new Date(b.date)), [reservations]);





    // 📅 Filtrage des réservations du jour (acceptées uniquement)
    const reservationsDuJour = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        return reservations.filter(res =>
            new Date(res.date).toISOString().split("T")[0] === today &&
            res.etat === "acceptée"
        );
    }, [reservations]);





    // 🍽 Séparation des réservations du midi (avant 14h)
    const reservationsMidi = useMemo(() =>
        reservationsDuJour.filter(res => parseInt(res.heure.split(":")[0], 10) < 14), [reservationsDuJour]);


    // 🌙 Séparation des réservations du soir (à partir de 18h)
    const reservationsSoir = useMemo(() =>
        reservationsDuJour.filter(res => parseInt(res.heure.split(":")[0], 10) >= 18), [reservationsDuJour]);




    // 🕰 Filtrage des réservations passées ou refusées, triées par date décroissante
    const reservationsPassees = useMemo(() => {
        const newDay = new Date();
        newDay.setHours(0, 0, 0, 0);
        return reservations
            .filter(res => {
                const dateResa = new Date(res.date);
                dateResa.setHours(0, 0, 0, 0);
                return (dateResa < newDay && res.etat !== "en attente") || res.etat === "refusée";
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [reservations]);




    // 📆 Filtrage des réservations passées selon le mois sélectionné
    const filteredReservations = useMemo(() => {
        if (!selectedMonth) return reservationsPassees;
        return reservationsPassees.filter(res => {
            const dateResa = new Date(res.date);
            const yearMonth = `${dateResa.getFullYear()}-${String(dateResa.getMonth() + 1).padStart(2, "0")}`;
            return yearMonth === selectedMonth;
        });
    }, [selectedMonth, reservationsPassees]);





    // ✅ Mise à jour du statut d'une réservation (acceptée ou refusée)
    const handleStatusUpdate = async (reservation, newStatus) => {
        const { id_reservation, date, heure, nbr_couvert } = reservation;
        try {
            const response = await fetch(`${API_URL}/admin/compte/${id_reservation}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ etat: newStatus, date, heure, nbr_couvert })
            });

            if (response.ok) {
                setReservations(prev =>
                    prev.map(res =>
                        res.id_reservation === id_reservation
                            ? { ...res, etat: newStatus }
                            : res
                    )
                );
            } else {
                console.error("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };





    // ❌ Suppression d'une réservation par l'utilisateur
    const handleDeleteResa = async (id_reservation) => {
        try {
            const response = await fetch(`${API_URL}/user/compte/${id_reservation}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user}` }
            });

            if (response.ok) {
                setReservations(prev =>
                    prev.filter(res => res.id_reservation !== id_reservation)
                );
            } else {
                const errorText = await response.text();
                console.error("Erreur lors de la suppression :", response.status, errorText);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };




    // 📤 Export CSV des réservations du mois sélectionné
    const handleDownload = () => {
        if (!selectedMonth) return alert("Choisissez un mois d'abord !");
        const header = `Le : ${selectedMonth}\nNom;Date;Heure;Couverts;État;Créé le`;
        const rows = filteredReservations.map(res => {
            const createdAt = new Date(res.created_at).toLocaleString("fr-FR", {
                year: "numeric", month: "2-digit", day: "2-digit",
                hour: "2-digit", minute: "2-digit", second: "2-digit"
            });
            return `${res.User.nom};${res.date};${res.heure};${res.nbr_couvert};${res.etat};${createdAt}`;
        });
        const csvContent = [header, ...rows].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `reservations_${selectedMonth}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };







    // ✅ suppression de l'utilisateur
    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`${API_URL}/user/delete`, {
                method: "DELETE",
                credentials: "include"
            });

            if (!response.ok) throw new Error("Échec de la suppression");

            setUser(null); // déconnecte l’utilisateur
            console.log("Utilisateur supprimé avec succès");

            // ✅ Redirection vers ta page
            window.location.href = `${API_URL}/LeFrontDeMer`;
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };




    // 🔄 Export des fonctions et états pour utilisation dans le composant
    return {
        reservations,
        setReservations,
        visibleCount,
        handleLoadMore,
        selectedMonth,
        setSelectedMonth,
        activeTab,
        setActiveTab,
        reservationsEnAttente,
        reservationsFutures,
        reservationsPassees,
        filteredReservations,
        reservationsDuJour,
        reservationsMidi,
        reservationsSoir,
        handleStatusUpdate,
        handleDeleteResa,
        handleDownload,
        handleDeleteUser
    };
};

export default useReservations;



