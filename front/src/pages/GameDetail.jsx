import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { fetchGameById, deleteGame } from "../api/game";

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
            <img src={game.poster?.[0]?.background_image} alt={game.title} />
            <p>{game.description}</p>
            <p>{game.releaseDate}</p>
            <p>{game.rating}</p>
            <button onClick={() => removeGame(game.id)}>Supprimer</button>
        </div>
    )
}

export default GameDetail

// API KEY : 51039b60657e40c5b624d25d048d7d3b

// 05-62-26-87-80