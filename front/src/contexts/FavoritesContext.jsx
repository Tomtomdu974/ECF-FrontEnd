import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) ?? []
    );

    const addFavorite = (item) => {
        const alreadyExists = favorites.some(
            (fav) => fav.id === item.id && fav.type === item.type
        );

        if (alreadyExists) return;

        setFavorites([...favorites, item]);
    };

    const removeFavorite = (item) => {
        const newFavorites = favorites.filter(
            (fav) => !(fav.id === item.id && fav.type === item.type)
        );
        setFavorites(newFavorites);
    };

    const isFavorite = (id, type) => {
        return favorites.some((fav) => fav.id === id && fav.type === type);
    };

    const toggleFavorite = (item) => {
        if (isFavorite(item.id, item.type)) {
            removeFavorite(item);
        } else {
            addFavorite(item);
        }
    };

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorite = () => useContext(FavoritesContext);