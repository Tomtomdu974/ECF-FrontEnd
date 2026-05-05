import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { fetchAnimeById, updateAnime } from "../../api/anime";
import Form from "../../components/forms/Form";

const EditAnime = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        fetchAnimeById(id).then((data) => setAnime(data));
    }, [id]);

    const handleUpdate = async (formData) => {
        const data = await updateAnime(id, formData);

        navigate(`/anime/${data.id}`);

        return data;
    };

    if (!anime) return <p>Chargement...</p>;

    return (
        <>
            <div className="media-card__actions">
                <h1>Modifier l'anime</h1>
                <Link to={'/'}>Retour a l'accueil</Link>
            </div>
            <Form
                type="anime"
                mode="edit"
                initialData={anime}
                onSubmit={handleUpdate}
                submitLabel="Modifier l'anime"
            />
        </>
    );
};

export default EditAnime;