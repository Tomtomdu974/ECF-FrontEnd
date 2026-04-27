import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fecthGames, deleteGame } from "../api/game";
import { fetchMangas } from "../api/manga";
import { fetchAnimes } from "../api/anime";
import { fetchCategories } from "../api/category";
import { fetchGenres } from "../api/genre";
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [games, setGames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState([]);
    const [category, setCategory] = useState('');
    const [mangas, setMangas] = useState([]);
    const [animes, setAnimes] = useState([]);

    const removeGame = async (id) => {
        await deleteGame(id);

        const data = await fecthGames(search, selectedGenre, category);
        setGames(data);
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
                setSelectedGenre(data);
            } else {
                setSelectedGenre([]);
            }
        });
    }, []);

    return (
        <div>
            <h1>Accueil</h1>
            <p>Rechercher</p>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />

            <p>Genre</p>
            <select onChange={(e) => setSelectedGenre(e.target.value && Array.isArray(e.target.value) ? e.target.value : [])}>
                <option value="">Tous</option>
                {selectedGenre.map((genre) => (
                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                ))}
            </select>

            <p>Categorie</p>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Toutes</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
            </select>

            <div>
                <h2>Manga</h2>
                {mangas && mangas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((manga) => (
                    <div key={manga.id}>
                        <Link to={`/manga/${manga.id}`}><h3>{manga.title}</h3></Link>
                        <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                        <p>{manga.description}</p>
                        <p>{manga.releaseDate}</p>
                        <p>{manga.rating}</p>
                        <button onClick={() => removeGame(manga.id)}>Supprimer</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Animes</h2>
                {animes && animes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((anime) => (
                    <div key={anime.id}>
                        <Link to={`/anime/${anime.id}`}><h3>{anime.title}</h3></Link>
                        <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                        <p>{anime.description}</p>
                        <p>{anime.releaseDate}</p>
                        <p>{anime.rating}</p>
                        <button onClick={() => removeGame(anime.id)}>Supprimer</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Jeux vidéos</h2>
                {games && games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((game) => (
                    <div key={game.id}>
                        <Link to={`/game/${game.id}`}><h3>{game.title}</h3></Link>
                        <img src={`${API_URL}/${game.image}`} alt={game.title} />
                        <p>{game.description}</p>
                        <p>{game.releaseDate}</p>
                        <p>{game.rating}</p>
                        <button onClick={() => removeGame(game.id)}>Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;