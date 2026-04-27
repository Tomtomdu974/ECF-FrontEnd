const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/mangas`;

export const fetchMangas = async (search = '', selectedGenre = '', category = '') => {
    let endpoint = `${ENDPOINT}?page=1`;

    if (selectedGenre.length > 0) {
        endpoint += `&selectedGenre=${selectedGenre}`;
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

export const fetchMangaById = async (id) => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    const data = await response.json();

    return data;
}

export const createManga = async (manga) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        body: JSON.stringify(manga)
    })

    const data = await response.json();

    return data;
}

export const updateManga = async (manga) => {
    const response = await fetch(`${ENDPOINT}/${manga.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(manga)
    })
    const data = await response.json();

    return data
}

export const deleteManga = async (id) => {
    await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE"
    })
}
