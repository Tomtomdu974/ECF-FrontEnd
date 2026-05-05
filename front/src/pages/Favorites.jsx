import { useFavorite } from "../contexts/FavoritesContext";
import { Link } from "react-router";
import '../styles/Favoris.css';

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorite();

    const favoriteMangas = favorites.filter((item) => item.type === "manga");
    const favoriteAnimes = favorites.filter((item) => item.type === "anime");
    const favoriteGames = favorites.filter((item) => item.type === "game");

    return (
        <main>
            <header className="favoris-header">
                <h1>Mes favoris</h1>
            </header>
            
            <section className="media-section" aria-labelledby="manga-favorites-heading">
                <h2 id="manga-favorites-heading">Mangas favoris</h2>
                <ul className="media-list">
                    {favoriteMangas.map((manga) => (
                        <li key={`manga-${manga.id}`}>
                            <article className="media-card">
                                <h3 className="media-card__title">
                                    <Link to={`/manga/${manga.id}`} className="media-card__link">
                                        {manga.title}
                                    </Link>
                                </h3>

                                <figure className="media-card__image">
                                    <img src={`${import.meta.env.VITE_API_URL}/${manga.image}`} alt={manga.title} />
                                </figure>

                                <div className="media-card__content">
                                    <p className="media-card__author">Auteur : {manga.author}</p>
                                    <p className="media-card__description">{manga.description}</p>
                                    <p className="media-card__date">Date de sortie : {manga.release_year}</p>
                                </div>

                                <footer className="media-card__actions">
                                    <button onClick={() => removeFavorite(manga)}>
                                        Retirer des favoris
                                    </button>
                                </footer>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="media-section" aria-labelledby="anime-favorites-heading">
                <h2 id="anime-favorites-heading">Animes favoris</h2>
                <ul className="media-list">
                    {favoriteAnimes.map((anime) => (
                        <li key={`anime-${anime.id}`}>
                            <article className="media-card">
                                <h3 className="media-card__title">
                                    <Link to={`/anime/${anime.id}`} className="media-card__link">
                                        {anime.title}
                                    </Link>
                                </h3>

                                <figure className="media-card__image">
                                    <img src={`${import.meta.env.VITE_API_URL}/${anime.image}`} alt={anime.title} />
                                </figure>

                                <div className="media-card__content">
                                    <p className="media-card__description">{anime.description}</p>
                                </div>

                                <footer className="media-card__actions">
                                    <button onClick={() => removeFavorite(anime)}>
                                        Retirer des favoris
                                    </button>
                                </footer>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="media-section" aria-labelledby="game-favorites-heading">
                <h2 id="game-favorites-heading">Jeux vidéos favoris</h2>
                <ul className="media-list">
                    {favoriteGames.map((game) => (
                        <li key={`game-${game.id}`}>
                            <article className="media-card">
                                <h3 className="media-card__title">
                                    <Link to={`/game/${game.id}`} className="media-card__link">
                                        {game.title}
                                    </Link>
                                </h3>

                                <figure className="media-card__image">
                                    <img src={`${import.meta.env.VITE_API_URL}/${game.image}`} alt={game.title} />
                                </figure>

                                <div className="media-card__content">
                                    <p className="media-card__description">{game.description}</p>
                                </div>

                                <footer className="media-card__actions">
                                    <button onClick={() => removeFavorite(game)}>
                                        Retirer des favoris
                                    </button>
                                </footer>
                            </article>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Favorites;