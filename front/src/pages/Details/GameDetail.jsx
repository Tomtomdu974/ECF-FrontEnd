import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchGameById, deleteGame } from "../../api/game";
const API_URL = import.meta.env.VITE_API_URL;

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});

    const removeGame = async (id) => {
        await deleteGame(id);

        const data = await fetchGameById();
        setGame(data);
    };

    useEffect(() => {
        fetchGameById(id).then(data => setGame(data));
    }, []);

    return (
        <div>
            <h1>{game.title}</h1>
            <img src={`${API_URL}/${game.image}`} alt={game.title} />
            <p>{game.description}</p>
            <p>{game.releaseDate}</p>
            <p>{game.rating}</p>
            <button onClick={() => removeGame(game.id)}>Supprimer</button>
        </div>
    )
}

export default GameDetail
