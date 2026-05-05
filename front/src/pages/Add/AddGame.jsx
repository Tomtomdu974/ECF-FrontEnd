import { useNavigate, Link } from "react-router";
import { createGame } from "../../api/game";
import Form from "../../components/forms/Form";

const AddGame = () => {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        const data = await createGame(formData);

        if (!data?.error) {
            navigate("/catalogue");
        }

        return data;
    };

    return (
        <>
            <div className="media-card__actions">
                <h1>Ajouter un Jeux Vidéo</h1>
                <Link to={'/'}>Retour a l'accueil</Link>
            </div>
            <Form
                type="game"
                mode="add"
                onSubmit={handleCreate}
                submitLabel="Ajouter un jeu vidéo"
            />
        </>
    );
};

export default AddGame;