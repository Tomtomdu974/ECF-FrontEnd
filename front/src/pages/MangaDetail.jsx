import { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { fetchMangaById, deleteManga } from '../api/manga';
const API_URL = import.meta.env.VITE_API_URL;

const MangaDetail = () => {
    const { id } = useParams();
    const [manga, setManga] = useState({});

    const removeGame = async (id) => {
            await deleteManga(id);
    
        const data = await fetchMangaById();
            setManga(data);
        }

    useEffect(() => {
        fetchMangaById(id).then(data => setManga(data));
    }, []);

    return (
        <div>
            <h1>{manga.title}</h1>
            <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
            <p>{manga.description}</p>
            <p>{manga.releaseDate}</p>
            <p>{manga.rating}</p>
            <button onClick={() => removeGame(manga.id)}>Supprimer</button>
        </div>
    );
};

export default MangaDetail;