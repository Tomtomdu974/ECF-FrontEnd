import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from 'react-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Veuillez remplir tous les champs');
            return;
        }

        setError('');

        await login(email, password);
    };

    return (
        <div>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px', color: 'white' }}>Mot de passe:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Se connecter
                </button>

                <p style={{ marginTop: '10px', color: "white" }}>Pas encore inscrit ? <Link to="/register" style={{ color: '#007bff' }}>S'inscrire</Link></p>
                <p style={{ marginTop: '10px', color: "white" }}>Mot de passe oublié ? <Link to="/forgot-password" style={{ color: '#007bff' }}>Réinitialiser le mot de passe</Link></p>
            </form>
        </div>
    )
}