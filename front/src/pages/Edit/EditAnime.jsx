import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { fetchCategories } from '../../api/category';
import { fetchGenres } from '../../api/genre';
import { updateAnime, fetchAnimeById } from '../../api/anime';

const EditAnime = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = await updateAnime(id, formData);

        navigate(`/anime/${data.id}`);
    }

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
        fetchGenres().then(data => setGenres(data));
        fetchAnimeById(id).then(data => setAnime(data));
    }, []);

    return (
        <div>
            {anime && categories.length > 0 && genres.length > 0 && (
                <form onSubmit={handleSubmit}>

                    <label>Titre du anime</label>
                    <input type="text" name="title" defaultValue={anime.title} />

                    <label>Auteur</label>
                    <input type="text" name="author" defaultValue={anime.author} />

                    <label>Description</label>
                    <input type="text" name="description" defaultValue={anime.description} />

                    <label>Date de sortie</label>
                    <input type="date" name="release_year" defaultValue={anime.release_year} />

                    <label>Nombre de d'épisodes</label>
                    <input type="number" name="nbEpisodes" defaultValue={anime.nbEpisodes} />

                    <label>Image</label>
                    <input type="file" name="image" />

                    <label>Catégorie</label>
                    <select name="CategoryId" defaultValue={anime.CategoryId}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>

                    <label>Genre</label>
                    <select name="GenderId" defaultValue={anime.GenderId}>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>

                    <button type="submit">Modifier</button>
                </form>
            )}
        </div>
    );
};

export default EditAnime;