import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fecthGames, deleteGame } from "../api/game";
import { fetchMangas, deleteManga } from "../api/manga";
import { fetchAnimes, deleteAnime } from "../api/anime";
import { fetchCategories } from "../api/category";
import { fetchGenres } from "../api/genre";
import '../styles/Catalogue.css';

const API_URL = import.meta.env.VITE_API_URL;

const Catalogue = () => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genres, setGenres] = useState([]);
    const [category, setCategory] = useState('');
    const [mangas, setMangas] = useState([]);
    const [animes, setAnimes] = useState([]);

    const removeGame = async (id) => {
        await deleteGame(id);

        const data = await fecthGames(search, selectedGenre, category);
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
        fetchMangas(search, selectedGenre, category).then(data => setMangas(data));
    }, [search, selectedGenre, category]);

    useEffect(() => {
        fecthGames(search, selectedGenre, category).then(data => setGames(data));
    }, [search, selectedGenre, category]);

    useEffect(() => {
        fetchAnimes(search, selectedGenre, category).then(data => setAnimes(data));
    }, [search, selectedGenre, category]);

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
    }, []);

    useEffect(() => {
        fetchGenres().then(data => {
            if (Array.isArray(data)) {
                setGenres(data);
            } else {
                setGenres([]);
            }
        });
    }, []);

    return (
        <main>
            <header className="catalogue-header">
                <h1>Catalogue</h1>

                {/* Barre de filtres */}
                <div className="filters">
                    <form role="search" className="catalogue-search-form">
                        <label>
                            <input id="search" type="search" placeholder="Rechercher..." onChange={(e) => setSearch(e.target.value)} />
                        </label>
                    </form>

                    <div className="gender-filters">
                        <label>Genre</label>
                        <select id="genre-filter" onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="">Tous</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="category-filters">
                    <button
                        className={category === '' ? 'active' : ''}
                        onClick={() => setCategory('')}>
                        Tous
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={category == cat.id ? 'active' : ''}
                            onClick={() => setCategory(cat.id)}>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </header>

            {/* Section Mangas */}
            {(!category || categories.find(c => c.id == category)?.name === 'Manga') && (
                <section className="media-section">
                    <h2 id="manga-heading">Manga</h2>
                    <ul className="media-list">
                        {Array.isArray(mangas) && mangas
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map((manga) => (
                                <li key={manga.id}>
                                    <article className="media-card">
                                        <h3>
                                            <Link to={`/manga/${manga.id}`}>{manga.title}</Link>
                                        </h3>
                                        <figure className="media-card__image">
                                            <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                                        </figure>
                                        <div className="media-card__content">
                                            <p className="media-card__description">{manga.description}</p>
                                        </div>
                                        <footer className="media-card__actions">
                                            <Link to={`/edit/manga/${manga.id}`}>Modifier</Link>
                                            <button onClick={() => removeManga(manga.id)}>Supprimer</button>
                                        </footer>
                                    </article>
                                </li>
                            ))}
                    </ul>
                </section>
            )}

            {/* Section Animes */}
            {(!category || categories.find(c => c.id == category)?.name === 'Anime') && (
                <section className="media-section">
                    <h2 id="anime-heading">Animes</h2>
                    <ul className="media-list">
                        {Array.isArray(animes) && animes
                            .sort((a, b) => a.title.localeCompare(b.title))
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
            )}

            {/* Section Jeux vidéos */}
            {(!category || categories.find(c => c.id == category)?.name === 'Jeux videos') && (
                <section className="media-section">
                    <h2 id="games-heading">Jeux vidéos</h2>
                    <ul className="media-list">
                        {Array.isArray(games) && games
                            .sort((a, b) => a.title.localeCompare(b.title))
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
            )}
        </main>
    );
};

export default Catalogue;