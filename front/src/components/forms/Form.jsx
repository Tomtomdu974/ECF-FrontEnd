import { useEffect, useState } from "react";
import { fetchCategories } from "../../api/category";
import { fetchGenres } from "../../api/genre";
import '../../styles/Form.css';

const Form = ({
    type,
    mode = "add",
    initialData = null,
    onSubmit,
    submitLabel
}) => {
    const [categories, setCategories] = useState([]);
    const [genres, setGenres] = useState([]);
    const [error, setError] = useState({});
    const [categoryId, setCategoryId] = useState("");
    const [genderId, setGenderId] = useState("");

    useEffect(() => {
        fetchCategories().then((data) => setCategories(data));
        fetchGenres().then((data) => setGenres(data));
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCategoryId(String(initialData?.CategoryId ?? ""));
        setGenderId(String(initialData?.GenderId ?? ""));
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        const formData = new FormData(e.target);

        try {
            const data = await onSubmit(formData);
            return data;
        } catch (err) {
            if (err?.errors) {
                setError(err.errors);
                return;
            }

            if (err?.message) {
                setError({ global: err.message });
                return;
            }

            setError({ global: "Une erreur s'est produite" });
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text" id="title" name="title" defaultValue={initialData?.title || ""} />
                    {error.title && <p className="form-error">{error.title}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="release_year">Date de sortie</label>
                    <input type="date" id="release_year" name="release_year" defaultValue={initialData?.release_year || ""} />
                    {error.release_year && <p className="form-error">{error.release_year}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="author">Auteur</label>
                    <input type="text" id="author" name="author" defaultValue={initialData?.author || ""} />
                    {error.author && <p className="form-error">{error.author}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" defaultValue={initialData?.description || ""} />
                    {error.description && <p className="form-error">{error.description}</p>}
                </div>

                {type === "manga" && (
                    <div className="form-group">
                        <label htmlFor="nbVolumes">Nombre de volumes</label>
                        <input type="number" id="nbVolumes" name="nbVolumes" defaultValue={initialData?.nbVolumes || ""} />
                        {error.nbVolumes && <p className="form-error">{error.nbVolumes}</p>}
                    </div>
                )}

                {type === "anime" && (
                    <div className="form-group">
                        <label htmlFor="nbEpisodes">Nombre d'épisodes</label>
                        <input type="number" id="nbEpisodes" name="nbEpisodes" defaultValue={initialData?.nbEpisodes || ""} />
                        {error.nbEpisodes && <p className="form-error">{error.nbEpisodes}</p>}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="CategoryId">Catégorie</label>
                    <select
                        id="CategoryId"
                        name="CategoryId"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">-- Choisir une catégorie --</option>
                        {categories.map((category) => (
                            <option key={category.id} value={String(category.id)}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {error.CategoryId && <p className="form-error">{error.CategoryId}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="GenderId">Genre</label>
                    <select
                        id="GenderId"
                        name="GenderId"
                        value={genderId}
                        onChange={(e) => setGenderId(e.target.value)}
                    >
                        <option value="">-- Choisir un genre --</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={String(genre.id)}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                    {error.GenderId && <p className="form-error">{error.GenderId}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" name="image" />
                    {error.image && <p className="form-error">{error.image}</p>}
                </div>

                <button type="submit" className="form-submit">
                    {submitLabel || (mode === "edit" ? "Modifier" : "Ajouter")}
                </button>

            </form>
        </div>
    );
};

export default Form;