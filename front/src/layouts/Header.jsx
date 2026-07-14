import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useFavorite } from '../contexts/FavoritesContext';
import '../styles/Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { favorites } = useFavorite();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header>
            <nav className='header-nav'>
                <h2>Otaku Verse</h2>

                <button
                    className={`burger-btn ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Ouvrir le menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`header-links ${menuOpen ? 'open' : ''}`}>
                    <Link to={'/'} onClick={closeMenu}>Accueil</Link>
                    <Link to={'/catalogue'} onClick={closeMenu}>Catalogue</Link>

                    {user && <Link to={'/favorites'} onClick={closeMenu}>Favoris ({favorites.length})</Link>}
                    {user && <Link to={'/profil'}><p>{user.userName}</p></Link>}
                    {user?.role === 'admin' && <Link to={'/dashboard'} onClick={closeMenu}>Espace admin</Link>}
                    {user && <button onClick={() => { logout(); closeMenu(); }}>Se déconnecter</button>}

                    {!user && <Link to={'/login'} onClick={closeMenu}>Connexion</Link>}
                    {!user && <Link to={'/register'} onClick={closeMenu}>Créer un compte</Link>}
                </div>

                {menuOpen && <div className="header-overlay" onClick={closeMenu}></div>}
            </nav>
        </header>
    );
};

export default Header;