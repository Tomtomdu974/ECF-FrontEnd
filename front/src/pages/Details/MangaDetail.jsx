const API_URL = import.meta.env.VITE_API_URL;
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { fetchMangaById } from '../../api/manga';
import { useFavorite } from "../../contexts/FavoritesContext";
import Delete from '../../components/Delete';
import '../../styles/Details.css';


const MangaDetail = () => {
    const { id } = useParams();
    const [manga, setManga] = useState({});
    const navigate = useNavigate();
    const { isFavorite, toggleFavorite } = useFavorite();

    useEffect(() => {
        fetchMangaById(id).then(data => setManga(data));
    }, []);

    return (
        <main className="detail-page">
            <section className="detail-card">
                <div className="detail-image">
                    {manga.image && (
                        <img src={`${API_URL}/${manga.image}`} alt={manga.title} />
                    )}
                </div>

                <div className="detail-content">
                    <h1 className="detail-title">{manga.title}</h1>

                    <p className="detail-description">{manga.description}</p>

                    <div className="detail-infos">
                        <p><span>Date de sortie :</span> {manga.release_year}</p>
                        <p><span>Genre :</span> {manga.Gender?.name}</p>
                        <p><span>Nombre de volumes :</span> {manga.nbVolumes}</p>
                    </div>

                    <div className="detail-actions">
                        <Link to={`/edit/manga/${manga.id}`} className="detail-btn edit-btn">
                            Modifier
                        </Link>

                        <button className="detail-btn favorite-btn" onClick={() => toggleFavorite({ ...manga, type: "manga" })}>
                            {isFavorite(manga.id, "manga") ? "Retirer des favoris" : "Ajouter au favoris"}
                        </button>

                        <Delete
                            id={manga.id}
                            type="manga"
                            className="detail-btn delete-btn"
                            onDeleted={() => navigate("/catalogue")}
                        />
                    </div>
                    <Link to={'/catalogue'} className="detail-btn back-btn">Retour au catalogue</Link>
                </div>
            </section>
        </main>
    );
};

export default MangaDetail;