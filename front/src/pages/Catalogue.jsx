import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fecthGames, deleteGame } from "../api/game";
import { fetchMangas, deleteManga } from "../api/manga";
import { fetchAnimes, deleteAnime } from "../api/anime";
import { fetchCategories } from "../api/category";
import { fetchGenres } from "../api/genre";

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
        <div>
            <h1>Catalogue</h1>
            <Link to="/">Retour à l'accueil</Link>
            <p>Rechercher</p>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />


            <p>Genre</p>
            <select onChange={(e) => setSelectedGenre(e.target.value)}>
                <option value="">Tous</option>
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
            </select>

            <p>Categorie</p>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Toutes</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            {(!category || categories.find(c => c.id == category)?.name === 'Manga') && (
                <div>
                    <h2>Manga</h2>
                    {mangas && mangas.sort((a, b) => a.title.localeCompare(b.title)).map((manga) => (
                        <div key={manga.id}>
                            <Link to={`/manga/${manga.id}`}><h3>{manga.title}</h3></Link>
                            <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                            <p>{manga.description}</p>
                            <Link to={`/edit/manga/${manga.id}`}>Modifier</Link>
                            <button onClick={() => removeManga(manga.id)}>Supprimer</button>
                        </div>
                    ))}
                </div>
            )}

            {(!category || categories.find(c => c.id == category)?.name === 'Anime') && (
                <div>
                    <h2>Animes</h2>
                    {animes && animes.sort((a, b) => a.title.localeCompare(b.title)).map((anime) => (
                        <div key={anime.id}>
                            <Link to={`/anime/${anime.id}`}><h3>{anime.title}</h3></Link>
                            <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                            <p>{anime.description}</p>
                            <Link to={`/edit/anime/${anime.id}`}>Modifier</Link>
                            <button onClick={() => removeAnime(anime.id)}>Supprimer</button>
                        </div>
                    ))}
                </div>
            )}

            {(!category || categories.find(c => c.id == category)?.name === 'Jeux videos') && (
                <div>
                    <h2>Jeux vidéos</h2>
                    {games && games.sort((a, b) => a.title.localeCompare(b.title)).map((game) => (
                        <div key={game.id}>
                            <Link to={`/game/${game.id}`}><h3>{game.title}</h3></Link>
                            <img src={`${API_URL}/${game.image}`} alt={game.title} />
                            <p>{game.description}</p>
                            <Link to={`/edit/game/${game.id}`}>Modifier</Link>
                            <button onClick={() => removeGame(game.id)}>Supprimer</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Catalogue;