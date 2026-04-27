const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/animes`;
// const OMDB_KEY = import.meta.env.VITE_OMDB_KEY;

export const fetchAnimes = async (search = '', selectedGenre = '', category = '') => {
    let endpoint = `${ENDPOINT}?page=1`;

    if (selectedGenre.length > 0) {
        endpoint += `&genre=${selectedGenre.join(',')}`;
    }

    if (search.length > 0) {
        endpoint += `&search=${search}`;
    }

    if (category.length > 0) {
        endpoint += `&category=${category}`;
    }

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchAnimeById = async (id) => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    const data = await response.json();
    
    const poster = await fetchPoster(data.title);
    data.poster = poster;

    return data;
}

// const fetchPoster = async (title) => {
//     const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&t=${title}`)
//     const data = await response.json();

//     return data;
// }

const fetchPoster = async (title) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${title}&limit=1`);
    const data = await response.json();

    return data;
}

export const createAnime = async (anime) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(anime)
    })

    const data = await response.json();

    return data;
}

export const updateAnime = async (anime) => {
    const response = await fetch(`${ENDPOINT}/${anime.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(anime)
    })
    const data = await response.json();

    return data
}

export const deleteAnime = async (id) => {
    await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE"
    })
}