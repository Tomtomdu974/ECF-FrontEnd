import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { fetchMangaById, deleteManga } from '../../api/manga';
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
            <Link to={'/'}>Retour a l'accueil</Link>
            <h1>{manga.title}</h1>
            <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
            <h4>Auteur : {manga.author}</h4>
            <p>{manga.description}</p>
            <p>Date de sortie : {manga.release_year}</p>
            <p>Nombre volumes : {manga.nbVolumes}</p>
            <p>Genre : {manga.Gender?.name}</p>
            <Link to={`/edit/manga/${manga.id}`}>Modifier</Link>
            <button onClick={() => removeGame(manga.id)}>Supprimer</button>
        </div>
    );
};

export default MangaDetail;