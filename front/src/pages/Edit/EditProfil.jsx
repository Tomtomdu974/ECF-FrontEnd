import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/EditProfil.css";

const EditProfil = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);

            alert("Profil mis à jour avec succès !");

            navigate("/profil");
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Modifier mon profil</h1>

                <form onSubmit={handleSubmit} className="profile-form">

                    <div className="form-group">
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nouveau mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Laisser vide pour ne pas modifier"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="profile-actions">
                        <button type="submit" className="save">
                            Enregistrer
                        </button>

                        <Link to="/profil" className="cancel">
                            Annuler
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProfil;