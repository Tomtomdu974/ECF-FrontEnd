import { Link } from 'react-router';
import '../../styles/Dashboard.css';

const DashboardHome = () => {
    return (
        <main className="admin-page">
            <h1>Espace administrateur</h1>

            <div className="admin-grid">
                <Link to="/dashboard/users" className="admin-card">
                    <h2>Utilisateurs</h2>
                    <p>Gérer les comptes, les rôles et les suppressions</p>
                </Link>

                <Link to="/dashboard/categories" className="admin-card">
                    <h2>Catégories</h2>
                    <p>Ajouter ou supprimer des catégories</p>
                </Link>

                <Link to="/dashboard/genres" className="admin-card">
                    <h2>Genres</h2>
                    <p>Ajouter ou supprimer des genres</p>
                </Link>

                <Link to="/add/manga" className="admin-card">
                    <h2>Ajouter un Manga</h2>
                </Link>

                <Link to="/add/anime" className="admin-card">
                    <h2>Ajouter un Anime</h2>
                </Link>

                <Link to="/add/game" className="admin-card">
                    <h2>Ajouter un Jeu</h2>
                </Link>
            </div>
        </main>
    );
};

export default DashboardHome;