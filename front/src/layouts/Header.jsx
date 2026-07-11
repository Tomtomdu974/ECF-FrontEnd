import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useFavorite } from '../contexts/FavoritesContext';
import '../styles/Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const { favorites } = useFavorite();

    return (
        <header>
            <nav className='header-nav'>
                <h2>Otaku Verse</h2>

                <Link to={'/'}>Accueil</Link>
                <Link to={'/catalogue'}>Catalogue</Link>

                {user && <Link to={'/favorites'}>Favoris ({favorites.length})</Link>}
                {user && <p>{user.userName}</p>}
                {user && <button onClick={logout}>Se déconnecter</button>}

                {!user && <Link to={'/login'}>Connexion</Link>}
                {!user && <Link to={'/register'}> Créer un compte</Link>}

            </nav>
        </header>
    );
};

export default Header;