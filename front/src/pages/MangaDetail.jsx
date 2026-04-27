import { useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { fetchMangaById, deleteManga } from '../api/manga';

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
            <img src={manga.poster?.data[0]?.images?.jpg?.image_url} alt={manga.title} />
            <p>{manga.description}</p>
            <p>{manga.releaseDate}</p>
            <p>{manga.rating}</p>
            <button onClick={() => removeGame(manga.id)}>Supprimer</button>
        </div>
    );
};

export default MangaDetail;