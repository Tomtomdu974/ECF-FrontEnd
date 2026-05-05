const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/categories`;

export const fetchCategories = async () => {
    const response = await fetch(`${ENDPOINT}`);
    const data = await response.json();

    return data;
}

export const createCategory = async (category) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })

    const data = await response.json();

    return data;
}