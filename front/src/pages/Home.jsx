import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fecthGames, deleteGame } from "../api/game";
import { fetchMangas, deleteManga } from "../api/manga";
import { fetchAnimes, deleteAnime } from "../api/anime";

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [mangas, setMangas] = useState([]);
    const [animes, setAnimes] = useState([]);

    const removeGame = async (id) => {
        await deleteGame(id);

        const data = await fecthGames(search);
        setGames(data);
    }

    const removeManga = async (id) => {
        await deleteManga(id);

        const data = await fetchMangas(search);
        setMangas(data);
    }

    const removeAnime = async (id) => {
        await deleteAnime(id);

        const data = await fetchAnimes(search);
        setAnimes(data);
    }

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
                <h2 id="manga-heading">Manga</h2>
                <ul className="media-list">
                    {Array.isArray(mangas) && mangas
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((manga) => (
                            <Link to={`/manga/${manga.id}`}>
                                <li key={manga.id}>
                                    <article className="media-card">
                                        <h3>
                                            {manga.title}
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
                                            <Link to={`/edit/manga/${manga.id}`}>Modifier</Link>
                                            <button onClick={() => removeManga(manga.id)}>Supprimer</button>
                                        </footer>
                                    </article>
                                </li>
                            </Link>
                        ))}
                </ul>
            </section>

            {/* Section Animes */}
            <section className="media-section" aria-labelledby="anime-heading">
                <h2 id="anime-heading">Animes</h2>
                <ul className="media-list">
                    {Array.isArray(animes) && animes
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((anime) => (
                            <li key={anime.id}>
                                <article className="media-card">
                                    <h3>
                                        <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
                                    </h3>
                                    <figure className="media-card__image">
                                        <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                                    </figure>
                                    <div className="media-card__content">
                                        <p className="media-card__description">{anime.description}</p>
                                    </div>
                                    <footer className="media-card__actions">
                                        <Link to={`/edit/anime/${anime.id}`}>Modifier</Link>
                                        <button onClick={() => removeAnime(anime.id)}>Supprimer</button>
                                    </footer>
                                </article>
                            </li>
                        ))}
                </ul>
            </section>

            {/* Section Jeux vidéos */}
            <section className="media-section" aria-labelledby="games-heading">
                <h2 id="games-heading">Jeux vidéos</h2>
                <ul className="media-list">
                    {Array.isArray(games) && games
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .slice(0, 6)
                        .map((game) => (
                            <li key={game.id}>
                                <article className="media-card">
                                    <h3>
                                        <Link to={`/game/${game.id}`}>{game.title}</Link>
                                    </h3>
                                    <figure className="media-card__image">
                                        <img src={`${API_URL}/${game.image}`} alt={game.title} />
                                    </figure>
                                    <div className="media-card__content">
                                        <p className="media-card__description">{game.description}</p>
                                    </div>
                                    <footer className="media-card__actions">
                                        <Link to={`/edit/game/${game.id}`}>Modifier</Link>
                                        <button onClick={() => removeGame(game.id)}>Supprimer</button>
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