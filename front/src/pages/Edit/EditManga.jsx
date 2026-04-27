import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { fetchCategories } from '../../api/category';
import { fetchGenres } from '../../api/genre';
import { updateManga, fetchMangaById } from '../../api/manga';

const EditManga = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manga, setManga] = useState(null);
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = await updateManga(id, formData);

        navigate(`/manga/${data.id}`);
    }

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
        fetchGenres().then(data => setGenres(data));
        fetchMangaById(id).then(data => setManga(data));
    }, []);

    return (
        <div>
            {manga && categories.length > 0 && genres.length > 0 && (
            <form onSubmit={handleSubmit}>

                <label>Titre du manga</label>
                <input type="text" name="title" defaultValue={manga.title} />

                <label>Auteur</label>
                <input type="text" name="author" defaultValue={manga.author} />

                <label>Description</label>
                <input type="text" name="description" defaultValue={manga.description} />

                <label>Date de sortie</label>
                <input type="date" name="release_year" defaultValue={manga.release_year} />

                <label>Nombre de volumes</label>
                <input type="number" name="nbVolumes" defaultValue={manga.nbVolumes} />

                <label>Image</label>
                <input type="file" name="image" />

                <label>Catégorie</label>
                <select name="CategoryId" defaultValue={manga.CategoryId}>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <label>Genre</label>
                <select name="GenderId" defaultValue={manga.GenderId}>
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

export default EditManga;