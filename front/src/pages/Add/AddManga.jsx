import { useNavigate, Link } from "react-router";
import { createManga } from "../../api/manga";
import Form from "../../components/forms/Form";

const AddManga = () => {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        const data = await createManga(formData);

        if (!data?.error) {
            navigate("/catalogue");
        }

        return data;
    };

    return (
        <>
            <div className="media-card__actions">
                <h1>Ajouter un Manga</h1>
                <Link to={'/'}>Retour a l'accueil</Link>
            </div>
            <Form
                type="manga"
                mode="add"
                onSubmit={handleCreate}
                submitLabel="Ajouter un manga"
            />
        </>
    );
};

export default AddManga;