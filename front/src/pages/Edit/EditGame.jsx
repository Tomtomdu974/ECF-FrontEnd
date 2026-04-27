import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router";
import { fetchCategories } from '../../api/category';
import { fetchGenres } from '../../api/genre';
import { updateGame, fetchGameById } from '../../api/game';

const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = await updateGame(id, formData);

        navigate(`/game/${data.id}`);
    }

    useEffect(() => {
        fetchCategories().then(data => setCategories(data));
        fetchGenres().then(data => setGenres(data));
        fetchGameById(id).then(data => setGame(data));
    }, []);

    return (
        <div>
            {game && categories.length > 0 && genres.length > 0 && (
            <form onSubmit={handleSubmit}>

                <label>Titre du jeux
                    <input type="text" name="title" defaultValue={game.title} />
                </label>

                <label>Auteur
                    <input type="text" name="author" defaultValue={game.author} />
                </label>

                <label>Description
                    <input type="text" name="description" defaultValue={game.description} />
                </label>

                <label>Date de sortie
                    <input type="date" name="release_year" defaultValue={game.release_year} />
                </label>

                <label>Image
                    <input type="file" name="image" />
                </label>

                <label>Categorie
                    <select name="CategoryId" defaultValue={game.CategoryId}>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </label>

                <label>Genre
                    <select name="GenreId" defaultValue={game.GenreId}>
                        {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                    </select>
                </label>

                <button type="submit">Modifier</button>
            </form>
            )}
        </div>
    );
};

export default EditGame;