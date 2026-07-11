const API_URL = import.meta.env.VITE_API_URL;
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { fetchAnimeById } from "../../api/anime";
import { useFavorite } from "../../contexts/FavoritesContext";
import { useAuth } from '../../contexts/AuthContext';
import Delete from "../../components/Delete";
import '../../styles/Details.css';

const AnimeDetail = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorite();
    const { user } = useAuth();

    useEffect(() => {
        fetchAnimeById(id).then(data => setAnime(data));
    }, []);

    return (
        <main className="detail-page">
            <section className="detail-card">
                <div className="detail-image">
                    {anime.image && (
                        <img src={`${API_URL}/${anime.image}`} alt={anime.title} />
                    )}
                </div>

                <div className="detail-content">
                    <h1 className="detail-title">{anime.title}</h1>

                    <p className="detail-description">{anime.description}</p>

                    <div className="detail-infos">
                        <p><span>Date de sortie :</span> {anime.release_year}</p>
                        <p><span>Genre :</span> {anime.Gender?.name}</p>
                        <p><span>Nombre de volumes :</span> {anime.nbVolumes}</p>
                    </div>

                    <div className="detail-actions">
                        {user && <Link to={`/edit/anime/${anime.id}`} className="detail-btn edit-btn">
                            Modifier
                        </Link>}

                        {user && <button className="detail-btn favorite-btn" onClick={() => toggleFavorite({ ...anime, type: "anime" })}>
                            {isFavorite(anime.id, "anime") ? "Retirer des favoris" : "Ajouter au favoris"}
                        </button>}

                        {user && <Delete
                            id={anime.id}
                            type="anime"
                            className="detail-btn delete-btn"
                            onDeleted={() => navigate("/catalogue")}
                        />}
                    </div>
                    <Link to={'/catalogue'} className="detail-btn back-btn">Retour au catalogue</Link>
                </div>
            </section>
        </main>
    )
}

export default AnimeDetail