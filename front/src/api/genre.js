const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/genders`;

export const fetchGenres = async () => {
    const response = await fetch(`${ENDPOINT}`);
    const data = await response.json();

    return data;
}

export const createGenre = async (genre) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(genre)
    })

    const data = await response.json();

    return data;
}

export const deleteGenre = async (id) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json();
        throw data;
    }
}