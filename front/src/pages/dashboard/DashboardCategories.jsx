import { useEffect, useState } from 'react';
import { fetchCategories, createCategory, deleteCategory } from '../../api/category';
import '../../styles/Dashboard.css';

const DashboardCategories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState({});

    const loadCategories = () => {
        fetchCategories().then((data) => setCategories(data));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        try {
            await createCategory({ name });
            setName('');
            loadCategories();
        } catch (err) {
            if (err?.errors) {
                setError(err.errors);
                return;
            }
            setError({ global: err?.message || "La création a échoué" });
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Supprimer cette catégorie ?");
        if (!confirmed) return;

        try {
            await deleteCategory(id);
            loadCategories();
        } catch (err) {
            setError({ global: err?.message || "La suppression a échoué" });
        }
    };

    return (
        <main className="admin-page">
            <h1>Gestion des catégories</h1>

            <form onSubmit={handleSubmit} className="admin-inline-form">
                <input
                    type="text"
                    placeholder="Nouvelle catégorie"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="form-submit">Ajouter</button>
            </form>
            {error.name && <p className="form-error">{error.name}</p>}
            {error.global && <p className="form-error">{error.global}</p>}

            <ul className="admin-list">
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.name}
                        <button className="detail-btn delete-btn" onClick={() => handleDelete(category.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default DashboardCategories;