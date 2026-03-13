import { useState, useEffect } from "react";

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("analytics_consent");
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("analytics_consent", "granted");
        setVisible(false);
    };

    const denyCookies = () => {
        localStorage.setItem("analytics_consent", "denied");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup}>
                <h3 style={styles.title}>Préférences de cookies</h3>
                <p style={styles.text}>
                    Nous utilisons des cookies optionnels pour améliorer votre expérience
                    (statistiques anonymes). Vous pouvez accepter ou refuser.
                </p>

                <div style={styles.buttons}>
                    <button style={styles.accept} onClick={acceptCookies}>
                        Accepter
                    </button>
                    <button style={styles.deny} onClick={denyCookies}>
                        Refuser
                    </button>
                </div>
                <p style={styles.text}>
                    Vous pourrez modifier vos préférences à tout moment en vous rendant à la section cookies de la page de confidentialité.
                </p>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "rgba(0,0,0,0.5)",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        zIndex: 9999,
    },
    title: {
        color: "black"
    },
    text: { color: "black" },
    popup: {
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    },
    buttons: {
        marginTop: "15px",
        display: "flex",
        justifyContent: "space-between",
    },
    accept: {
        background: "#4CAF50",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    deny: {
        background: "#d9534f",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default CookieConsent;
