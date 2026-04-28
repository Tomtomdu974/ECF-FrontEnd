import { Link } from 'react-router';

const Header = () => {
    return (
        <header>
            <nav className='header-nav'>
                <Link to={'/'}>Accueil</Link>
                <Link to={'/catalogue'}>Catalogue</Link>
                <Link to={'/favorites'}>Favoris</Link>
                <Link to={'/login'}>Connexion</Link>
            </nav>
        </header>
    );
};

export default Header;