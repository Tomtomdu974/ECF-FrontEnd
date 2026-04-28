import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) ?? []);

    const addFavorite = (manga) => {
        // console.log(manga);
        const alreadyExists = favorites.some(fav => fav.id === manga.id);

        if (alreadyExists) {
            return;
        }

        setFavorites([...favorites, manga]);
    }

    const removeFavorite = (manga) => {
        const newFavorites = favorites.filter(fav => fav.id !== manga.id);
        setFavorites(newFavorites);
    }

    const isFavorite = (id) => {
        return favorites.some(manga => manga?.id === id);
    }

    const toggleFavorite = (manga) => {
        if (isFavorite(manga.id)) {
            removeFavorite(manga);
        } else {
            addFavorite(manga);
        }
    }

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites])

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export const useFavorite = () => useContext(FavoritesContext);