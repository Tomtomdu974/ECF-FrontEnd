const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/games`;
const RAWG_KEY = import.meta.env.VITE_RAWG_KEY;

export const fecthGames = async (search = '', selectedGenre = '', category = '') => {
    let endpoint = ENDPOINT + '?page=1';

    if (selectedGenre.length > 0) {
        endpoint += `&genre=${selectedGenre}`;
    }

    if (search.length > 0) {
        endpoint += `&search=${search}`;
    }

    if (category.length > 0) {
        endpoint += `&category=${category}`;
    }

    const response = await fetch(endpoint);
    const data = await response.json();

    const additionnalsData = await fetchPoster(data.title);
    data.poster = additionnalsData.results;

    return data;
}

export const fetchGameById = async (id) => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    const data = await response.json();

    const additionnalsData = await fetchPoster(data.title);
    data.poster = additionnalsData.results;

    return data;
}

const fetchPoster = async (title) => {
    const response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${title}&page_size=1`)
    const data = await response.json();

    return data;
}

export const updateGame = async (game) => {
    const response = await fetch(`${ENDPOINT}/${game.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    })
    const data = await response.json();

    return data
}

export const createGame = async (game) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        // Vu qu'on envois une image, un fichier, on envois pas en content-type application/json
        // et on utilise pas JSON.stringify()
        body: game
    })

    return await response.json();
}

export const deleteGame = async (id) => {
    await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE"
    })
}