'use client';

import { Provider } from "react-redux"
import { store } from './';
import { useEffect } from "react";
import { setFavoritePokemons } from "./pokemons/pokemons";

interface Props {
    children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
    
    // Este efecto solo se ejecuta una vez, luego de que el componente Providers monta toda la aplicacion y pues él monta toda la aplicacion porque a toda la aplicación le pasamos la store de redux
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
        // console.log({ favorites });
        store.dispatch(setFavoritePokemons(favorites));
    }, []);

    return (
        <Provider store={store}>
            { children }
        </Provider>
    )
}