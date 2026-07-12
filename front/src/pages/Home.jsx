import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fecthGames } from "../api/game";
import { fetchMangas } from "../api/manga";
import { fetchAnimes } from "../api/anime";
import { useFavorite } from "../contexts/FavoritesContext";
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [mangas, setMangas] = useState([]);
    const [animes, setAnimes] = useState([]);
    const { isFavorite, toggleFavorite } = useFavorite();
    const { user } = useAuth();

    useEffect(() => {
        fetchMangas(search).then(data => setMangas(data));
    }, [search]);

    useEffect(() => {
        fecthGames(search).then(data => setGames(data));
    }, [search]);

    useEffect(() => {
        fetchAnimes(search).then(data => setAnimes(data));
    }, [search]);

    return (
        <main>
            <header className="hero">
                <h1 className="title">Bienvenue sur Otaku Verse</h1>
                <form className="search-form" role="search">
                    <label htmlFor="search">
                        <input id="search" type="search" placeholder="Rechercher..." onChange={(e) => setSearch(e.target.value)} />
                    </label>
                </form>
            </header>

            {/* Section Mangas */}
            <section className="media-section" aria-labelledby="manga-heading">
                <div className="media-card__actions">
                    <h2 id="manga-heading">Manga ajout récent</h2>
                    {user?.role ==='admin' && <Link to='/add/manga'>Ajouter un Manga</Link>}
                </div>
                <ul className="media-list">
                    {Array.isArray(mangas) && mangas
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((manga) => (
                            <li key={manga.id}>
                                <article className="media-card">
                                    <h3 className="media-card__title">
                                        <Link to={`/manga/${manga.id}`} className="media-card__link">{manga.title}</Link>
                                    </h3>

                                    <figure className="media-card__image">
                                        <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                                    </figure>

                                    <div className="media-card__content">
                                        <p className="media-card__author">Auteur : {manga.author}</p>
                                        <p className="media-card__description">{manga.description}</p>
                                        <p className="media-card__date">Date de sortie : {manga.release_year}</p>
                                    </div>

                                    <footer className="media-card__actions">
                                        {user?.role ==='admin'&& <Link to={`/edit/manga/${manga.id}`}>Modifier</Link>}
                                        {user && <button onClick={() => toggleFavorite({ ...manga, type: "manga" })}>
                                            {isFavorite(manga.id, "manga") ? "Retirer des favoris" : "Ajouter au favoris"}
                                        </button>}
                                    </footer>
                                </article>
                            </li>
                        ))}
                </ul>
            </section>

            {/* Section Animes */}
            <section className="media-section" aria-labelledby="anime-heading">
                <div className="media-card__actions">
                    <h2 id="anime-heading">Animes ajout récent</h2>
                    {user?.role === 'admin' && <Link to='/add/anime'>Ajouter un Anime</Link>}
                </div>
                <ul className="media-list">
                    {Array.isArray(animes) && animes
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((anime) => (
                            <li key={anime.id}>
                                <article className="media-card">
                                    <h3 className="media-card__title">
                                        <Link to={`/anime/${anime.id}`} className="media-card__link">{anime.title}</Link>
                                    </h3>
                                    <figure className="media-card__image">
                                        <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                                    </figure>
                                    <div className="media-card__content">
                                        <p className="media-card__description">{anime.description}</p>
                                    </div>
                                    <footer className="media-card__actions">
                                        {user?.role === 'admin' && <Link to={`/edit/anime/${anime.id}`}>Modifier</Link>}
                                        {user && <button onClick={() => toggleFavorite({ ...anime, type: "anime" })}>
                                            {isFavorite(anime.id, "anime") ? "Retirer des favoris" : "Ajouter au favoris"}
                                        </button>}
                                    </footer>
                                </article>
                            </li>
                        ))}
                </ul>
            </section>

            {/* Section Jeux vidéos */}
            <section className="media-section" aria-labelledby="games-heading">
                <div className="media-card__actions">
                    <h2 id="games-heading">Jeux vidéos ajout récent</h2>
                    {user?.role === 'admin' && <Link to='/add/game'>Ajouter un Jeux Vidéo</Link>}
                </div>
                <ul className="media-list">
                    {Array.isArray(games) && games
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((game) => (
                            <li key={game.id}>
                                <article className="media-card">
                                    <h3 className="media-card__title">
                                        <Link to={`/game/${game.id}`} className="media-card__link">{game.title}</Link>
                                    </h3>
                                    <figure className="media-card__image">
                                        <img src={`${API_URL}/${game.image}`} alt={game.title} />
                                    </figure>
                                    <div className="media-card__content">
                                        <p className="media-card__description">{game.description}</p>
                                    </div>
                                    <footer className="media-card__actions">
                                        {user?.role === 'admin' && <Link to={`/edit/game/${game.id}`}>Modifier</Link>}
                                        {user && <button onClick={() => toggleFavorite({ ...game, type: "game" })}>
                                            {isFavorite(game.id, "game") ? "Retirer des favoris" : "Ajouter au favoris"}
                                        </button>}
                                    </footer>
                                </article>
                            </li>
                        ))}
                </ul>
            </section>
        </main>
    );
};

export default Home;