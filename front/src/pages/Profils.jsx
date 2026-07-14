import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";
import "../styles/Profils.css";

const Profils = () => {
    const { user } = useAuth();

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Mon profil</h1>

                <div className="profile-info">
                    <div className="info-row">
                        <span>Prénom</span>
                        <p>{user.firstName}</p>
                    </div>

                    <div className="info-row">
                        <span>Nom</span>
                        <p>{user.lastName}</p>
                    </div>

                    <div className="info-row">
                        <span>Nom d'utilisateur</span>
                        <p>{user.userName}</p>
                    </div>

                    <div className="info-row">
                        <span>Email</span>
                        <p>{user.email}</p>
                    </div>

                    <div className="info-row">
                        <span>Rôle</span>
                        <p>{user.role}</p>
                    </div>

                    <div className="edit-profil">
                        <Link to="/editprofil">
                            Modifier mon profil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profils;