const API_URL = import.meta.env.VITE_API_URL;
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchGameById } from "../../api/game";
import { useFavorite } from "../../contexts/FavoritesContext";
import '../../styles/Details.css';
import Delete from "../../components/Delete";

const GameDetail = () => {
    const { id } = useParams();
    const [game, setGame] = useState({});
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorite();

    useEffect(() => {
        fetchGameById(id).then(data => setGame(data));
    }, []);

    return (
        <main className="detail-page">
            <section className="detail-card">
                <div className="detail-image">
                    {game.image && (
                        <img src={`${API_URL}/${game.image}`} alt={game.title} />
                    )}
                </div>

                <div className="detail-content">
                    <h1 className="detail-title">{game.title}</h1>

                    <p className="detail-description">{game.description}</p>

                    <div className="detail-infos">
                        <p><span>Date de sortie :</span> {game.release_year}</p>
                        <p><span>Genre :</span> {game.Gender?.name}</p>
                        <p><span>Nombre de volumes :</span> {game.nbVolumes}</p>
                    </div>

                    <div className="detail-actions">
                        <Link to={`/edit/game/${game.id}`} className="detail-btn edit-btn">
                            Modifier
                        </Link>

                        <button className="detail-btn favorite-btn" onClick={() => toggleFavorite({ ...game, type: "game" })}>
                            {isFavorite(game.id, "game") ? "Retirer des favoris" : "Ajouter au favoris"}
                        </button>

                        <Delete
                            id={game.id}
                            type="game"
                            className="detail-btn delete-btn"
                            onDeleted={() => navigate("/catalogue")}
                        />
                    </div>
                    <Link to={'/catalogue'} className="detail-btn back-btn">Retour au catalogue</Link>
                </div>
            </section>
        </main>
    )
}

export default GameDetail
