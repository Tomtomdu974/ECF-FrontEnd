import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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

        if (!data?.error) {
            navigate(`/anime/${data.id}`);
        }

        return data;
    };

    if (!anime) return <p>Chargement...</p>;

    return (
        <Form
            type="anime"
            mode="edit"
            initialData={anime}
            onSubmit={handleUpdate}
            submitLabel="Modifier l'anime"
        />
    );
};

export default EditAnime;