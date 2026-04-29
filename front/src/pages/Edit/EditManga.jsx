import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchMangaById, updateManga } from "../../api/manga";
import Form from "../../components/forms/Form";

const EditManga = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [manga, setManga] = useState(null);

    useEffect(() => {
        fetchMangaById(id).then((data) => setManga(data));
    }, [id]);

    const handleUpdate = async (formData) => {
        const data = await updateManga(id, formData);

        if (!data?.error) {
            navigate(`/manga/${data.id}`);
        }

        return data;
    };

    if (!manga) return <p>Chargement...</p>;

    return (
        <Form
            type="manga"
            mode="edit"
            initialData={manga}
            onSubmit={handleUpdate}
            submitLabel="Modifier le manga"
        />
    );
};

export default EditManga;