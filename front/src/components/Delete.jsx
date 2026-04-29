import { deleteGame } from "../api/game";
import { deleteManga } from "../api/manga";
import { deleteAnime } from "../api/anime";

const deleteActions = {
    game: deleteGame,
    manga: deleteManga,
    anime: deleteAnime,
};

const Delete = ({id, type, onDeleted}) => {

    const handleDelete = async () => {
        const confirmed = window.confirm("Tu veux vraiment supprimer cet élément ?");
        if (!confirmed) return;

        await deleteActions[type](id);

        if (onDeleted) {
            onDeleted();
        }
    };

    return <button onClick={handleDelete}>Supprimer</button>;
}

export default Delete