import { Link } from 'react-router';
import { useFavorite } from '../contexts/FavoritesContext';
import '../styles/Header.css';

const Header = () => {
    const { favorites } = useFavorite();

    return (
        <header>
            <nav className='header-nav'>
                <h2>Otaku Verse</h2>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/catalogue'}>Catalogue</Link>
                <Link to={'/favorites'}>Favoris ({favorites.length})</Link>
                <Link to={'/login'}>Connexion</Link>
            </nav>
        </header>
    );
};

export default Header;