import { useFavorite } from '../contexts/FavouritesContextManga';
import { Link } from 'react-router';
const Favorites = () => {
    const { favorites, isFavorite, removeFavorite } = useFavorite();

    return (
        <div>
            <ul>
                {favorites.map(manga => (
                    <li key={manga.id}>
                        <Link to={`/manga/${manga.id}`}>{manga.title} : {manga.Genre.name}</Link>
                        <button onClick={() => removeFavorite(manga)}>{isFavorite(manga.id) ? "Retirer des favoris" : "Ajouter au favoris"}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Favorites;