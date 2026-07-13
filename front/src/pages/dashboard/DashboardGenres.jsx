import { useEffect, useState } from 'react';
import { fetchGenres, createGenre, deleteGenre } from '../../api/genre';
import '../../styles/Dashboard.css';

const DashboardGenres = () => {
    const [genders, setGenders] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState({});

    const loadGenders = () => {
        fetchGenres().then((data) => setGenders(data));
    };

    useEffect(() => {
        loadGenders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        try {
            await createGenre({ name });
            setName('');
            loadGenders();
        } catch (err) {
            if (err?.errors) {
                setError(err.errors);
                return;
            }
            setError({ global: err?.message || "La création a échoué" });
        }
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Supprimer ce genre ?");
        if (!confirmed) return;

        try {
            await deleteGenre(id);
            loadGenders();
        } catch (err) {
            setError({ global: err?.message || "La suppression a échoué" });
        }
    };

    return (
        <main className="admin-page">
            <h1>Gestion des genres</h1>

            <form onSubmit={handleSubmit} className="admin-inline-form">
                <input
                    type="text"
                    placeholder="Nouveau genre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className="form-submit">Ajouter</button>
            </form>
            {error.name && <p className="form-error">{error.name}</p>}
            {error.global && <p className="form-error">{error.global}</p>}

            <ul className="admin-list">
                {genders.map((gender) => (
                    <li key={gender.id}>
                        {gender.name}
                        <button className="detail-btn delete-btn" onClick={() => handleDelete(gender.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default DashboardGenres;