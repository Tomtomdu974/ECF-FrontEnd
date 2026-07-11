import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router";
const API_URL = import.meta.env.VITE_API_URL

const AuthContext = createContext();

// Ca c'est un component React classique, qui prend en props children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const verifyUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users/me`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Utilisateur non connecté");
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            if (!response.ok) {
                throw new Error;
            }
            const data = await response.json();
            setUser(data);
        } catch {
            return false;
        }
    }

    const logout = async () => {
        await fetch(`${API_URL}/users/logout`, {
            credentials: "include"
        });

        setUser(null);

        navigate('/login')
    }

    useEffect(() => {
        verifyUser();
    }, [])

    return (
        // Dans les values, je passe toutes les fonctions / constantes que je veux avoir d'accessible dans l'app
        <AuthContext.Provider value={{ user, setUser, loading, verifyUser, login, logout }}>
            {!loading ? children : <p>Chargement en cours</p>}
            {/* Souvent, on affiche juste l'enfant (children) */}
            {/* Ce qui permet dd'afficher l'application car les contextes englobent toute l'application */}
            {/* {children} */}
        </AuthContext.Provider>
    )
}

// C'est un raccourcis pour éviter d'importer dans tous nos fichiers useContext, AuthContext
// A la place, on importe juste useAuth et on l'utlise comme ça:
// const {user, setUser, loading} = useAuth();
export const useAuth = () => useContext(AuthContext);