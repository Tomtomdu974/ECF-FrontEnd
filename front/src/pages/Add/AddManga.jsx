import { useNavigate } from "react-router";
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
        <Form
            type="manga"
            mode="add"
            onSubmit={handleCreate}
            submitLabel="Ajouter un manga"
        />
    );
};

export default AddManga;