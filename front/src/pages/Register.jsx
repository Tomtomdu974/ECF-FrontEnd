import { useState } from "react";
import { useNavigate, Link } from 'react-router';
import { registerUser } from "../api/user";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (formData.password !== formData.confirmPassword) {
            setError({ confirmPassword: 'Les mots de passe ne correspondent pas' });
            return;
        }

        const { confirmPassword, ...payload } = formData;

        try {
            await registerUser(payload);
            navigate('/login');
        } catch (err) {
            if (err?.errors) {
                setError(err.errors);
                return;
            }
            setError({ global: err?.message || "L'inscription a échoué" });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Prénom:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    {error.firstName && <p className="form-error">{error.firstName}</p>}
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    {error.lastName && <p className="form-error">{error.lastName}</p>}
                </div>

                <div className="form-group">
                    <label>Nom d'utilisateur:</label>
                    <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
                    {error.userName && <p className="form-error">{error.userName}</p>}
                </div>

                <div className="form-group">
                    <label>Adresse email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    {error.email && <p className="form-error">{error.email}</p>}
                </div>
                <div className="form-group">
                    <label>Mot de passe:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    {error.password && <p className="form-error">{error.password}</p>}
                </div>

                <div className="form-group">
                    <label>Confirmer le mot de passe:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    {error.confirmPassword && <p className="form-error">{error.confirmPassword}</p>}
                </div>

                {error.global && <p className="form-error">{error.global}</p>}

                <button type="submit" className="form-submit">S'inscrire</button>

                <div style={{ marginTop: '10px' }}>Déjà inscrit ? <Link to="/login">Se connecter</Link></div>
            </form>
        </div>
    );
};

export default Register;