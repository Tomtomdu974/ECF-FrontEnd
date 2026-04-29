import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchGameById, updateGame } from "../../api/game";
import Form from "../../components/forms/Form";

const EditGame = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);

    useEffect(() => {
        fetchGameById(id).then((data) => setGame(data));
    }, [id]);

    const handleUpdate = async (formData) => {
        const data = await updateGame(id, formData);

        if (!data?.error) {
            navigate(`/game/${data.id}`);
        }

        return data;
    };

    if (!game) return <p>Chargement...</p>;

    return (
        <Form
            type="game"
            mode="edit"
            initialData={game}
            onSubmit={handleUpdate}
            submitLabel="Modifier le jeu vidéo"
        />
    );
};

export default EditGame;