import { useNavigate } from "react-router";
import { createAnime } from "../../api/anime";
import Form from "../../components/forms/Form";

const AddAnime = () => {
    const navigate = useNavigate();

    const handleCreate = async (formData) => {
        const data = await createAnime(formData);

        if (!data?.error) {
            navigate("/catalogue");
        }

        return data;
    };

    return (
        <Form
            type="anime"
            mode="add"
            onSubmit={handleCreate}
            submitLabel="Ajouter un anime"
        />
    );
};

export default AddAnime;