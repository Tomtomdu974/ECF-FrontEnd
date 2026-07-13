import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (!email || !password) {
            setError({ global: 'Veuillez remplir tous les champs' });
            return;
        }

        const success = await login(email, password);

        if (success === false) {
            setError({ global: 'Email ou mot de passe incorrect' });
        }
    };

    return (
        <div className="form-container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error.global && <p className="form-error">{error.global}</p>}

                <button className="form-submit">
                    Se connecter
                </button>

                <div style={{ marginTop: '10px', color: "white" }}>Pas encore inscrit ? <Link to="/register" style={{ color: '#007bff' }}>S'inscrire</Link></div>
            </form>
        </div>
    )
}