const API_URL = import.meta.env.VITE_API_URL;
const ENDPOINT = `${API_URL}/users`;

export const registerUser = async (formData) => {
    const response = await fetch(`${ENDPOINT}`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export const fetchUsers = async () => {
    const response = await fetch(`${ENDPOINT}`, {
        credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export const updateUser = async (id, payload) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "PUT",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw data;
    }

    return data;
}

export const deleteUser = async (id) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
        credentials: 'include'
    });

    if (!response.ok) {
        const data = await response.json();
        throw data;
    }
}