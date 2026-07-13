import { useState } from "react";
import { deleteGame } from "../api/game";
import { deleteManga } from "../api/manga";
import { deleteAnime } from "../api/anime";

const deleteActions = {
    game: deleteGame,
    manga: deleteManga,
    anime: deleteAnime,
};

const Delete = ({ id, type, onDeleted, className }) => {
    const [error, setError] = useState('');

    const handleDelete = async () => {
        const confirmed = window.confirm("Tu veux vraiment supprimer cet élément ?");
        if (!confirmed) return;

        setError('');

        try {
            await deleteActions[type](id);
            if (onDeleted) {
                onDeleted();
            }
        } catch (err) {
            setError(err?.message || "La suppression a échoué");
        }
    };

    return (
        <>
            <button className={className || "detail-btn delete-btn"} onClick={handleDelete}>Supprimer</button>
            {error && <p className="form-error">{error}</p>}
        </>
    );
}

export default Delete