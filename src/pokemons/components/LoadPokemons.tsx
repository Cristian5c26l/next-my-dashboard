'use client';
import { useAppDispatch } from "@/store";
// import { setInitialState } from "@/store/pokemons/pokemons";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const LoadPokemons = ({children}: Props) => {

  const dispatch = useAppDispatch();

  // const favoritesFromStore = useAppSelector(state => state.pokemonsReducer);
  // console.log('LoadPokemons',{ favoritesPokemonsFromStore }); // Se imprime una segunda vez debido a que setInitialState genera un nuevo estado "pokemonsReducer" el cual toma el valor de favorites (que es action.payload) contenido en el useEffect

    useEffect(() => {
        // Despues de montarse este componente, es decir, que desde el componente raiz app/layout.tsx se monte el componente Providers, se ejecuta el codigo siguiente (efecto secundario) solo la primera vez que se monte el componente mencionado Providers
        // const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
      // console.log('useEffect LoadPokemons',{favorites});// Se imprime 2 veces en modo producccion (npm run dev). useEffect se ejecuta 2 veces en npm run dev
        // dispatch(setInitialState(favorites));
    }, [dispatch]);// Se tuvo que poner el dispatch por el warning que generaba

  return children;
    
  
}
