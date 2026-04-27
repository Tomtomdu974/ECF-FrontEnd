import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchCategories } from '../../api/category';
import { fetchGenres } from '../../api/genre';
import { createGame } from '../../api/game';

const AddGame = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = await createGame(formData);

        if (data.error) {
            setError(data.error);
        } else {
            navigate('/catalogue');
        }
    };

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
        fetchGenres().then(data => setGenres(data));
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <label>Titre du jeux
                    <input type="text" name="title" />
                    {error.title && <span>{error.title}</span>}
                </label>

                <label>Auteur
                    <input type="text" name="author" />
                </label>

                <label>Description
                    <input type="text" name="description" />
                </label>

                <label>Date de sortie
                    <input type="date" name="release_year" />
                </label>

                <label>Image
                    <input type="file" name="image" />
                </label>

                <label>Catégorie
                    <select name="CategoryId">
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>

                <label>Genres
                    <select name="GenderId">
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddGame;