import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchAnimeById, deleteAnime } from "../../api/anime";
const API_URL = import.meta.env.VITE_API_URL;

const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState({});

    const removeGame = async (id) => {
        await deleteAnime(id);

        const data = await fetchAnimeById();
        setAnime(data);
    };

    useEffect(() => {
        fetchAnimeById(id).then(data => setAnime(data));
    }, []);

    return (
        <div>
            <h1>{anime.title}</h1>
            <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
            <p>{anime.description}</p>
            <p>{anime.releaseDate}</p>
            <p>{anime.rating}</p>
            <button onClick={() => removeGame(anime.id)}>Supprimer</button>
        </div>
    )
}

export default AnimeDetail