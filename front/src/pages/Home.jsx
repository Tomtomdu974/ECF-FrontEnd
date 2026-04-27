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
        <div>
            <h1>Accueil</h1>
            <Link to="/catalogue">Catalogue</Link>
            <p>Rechercher</p>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />

            <div>
                <h2>Manga</h2>
                {Array.isArray(mangas) && mangas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6).map((manga) => (
                    <div key={manga.id}>
                        <Link to={`/manga/${manga.id}`}><h3>{manga.title}</h3></Link>
                        <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                        <p>{manga.description}</p>
                        <p>{manga.releaseDate}</p>
                        <p>{manga.rating}</p>
                        <button onClick={() => removeManga(manga.id)}>Supprimer</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Animes</h2>
                {Array.isArray(animes) && animes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6).map((anime) => (
                    <div key={anime.id}>
                        <Link to={`/anime/${anime.id}`}><h3>{anime.title}</h3></Link>
                        <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                        <p>{anime.description}</p>
                        <p>{anime.releaseDate}</p>
                        <p>{anime.rating}</p>
                        <button onClick={() => removeAnime(anime.id)}>Supprimer</button>
                    </div>
                ))}
            </div>

            <div>
                <h2>Jeux vidéos</h2>
                {Array.isArray(games) && games.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6).map((game) => (
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