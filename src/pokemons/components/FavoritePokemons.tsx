'use client';

import { useAppSelector } from '@/store';
import { PokemonGrid } from './PokemonGrid';
// import { useEffect, useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';

// Ir a http://localhost:3000/dashboard/favorites para ver o mostrar componente FavoritePokemons
export const FavoritePokemons = () => {

    const favoritePokemons = Object.values(useAppSelector(state => state.pokemonsReducer.favorites));
    // console.log('FavoritePokemons', { favoritePokemons }); // Se imprime una segunda vez debido a que toggleFavorite (desde PokemonCard.stsx) genera un nuevo estado "pokemonsReducer".
    // const [pokemons, setPokemons] = useState(favoritePokemons);// pokemons en este caso tiene como valor inicial siempre favoritePokemons. "pokemons" será ahora independiente desde el principio (valor inicial) sin importar si el estado de la store (state.pokemonsReducer) cambia (con por ejemplo el dispatch del toggleFavorite que modificaria el state.pokemonsReducer lo cual haria que se volviera a ejecutar "useAppSelector(state => state.pokemonsReducer)" dentro de FavoritePokemons). Recordar que el estado "pokemons", del componente FavoritePokemons, solo cambiaría con setPokemons, por lo que los pokemons (array de SimplePokemon) que se pasan a PokemonGrid (y que posteriormente cada uno se pasa a un componente PokemonCard) siempre serán los mismos sin importar si a algun pokemon contenido en PokemonCard lo marco como favorito.... Cabe señalar decir que, sí que, a nivel de pokemon particular (componente PokemonCard), pues se cambiará a "No es favorito" al dar click en el corazon gracias a que se hace el dispatch de toggleFavorite la cual es una función que modificará el state de los pokemons favoritos de la store (pokemonsReducer el cual es un objeto que inicialmente tiene los pokemons '1', '3' y '5') eliminando por id que es de tipo string la llave de cada pokemon (SimplePokemon) lo cual generaría un nuevo state (nuevo pokemonsReducer) que será un objeto pero ya sin el pokemon en cuestion que marcamos como "No favorito" donde después. Al generar un nuevo state, ahi en PokemonCard donde esté useAppSelector para consultar ese objeto generado, se ejecutará nuevamente para volver a redibujar ese componente PokemonCard.

    // useEffect(() => {
    //     setPokemons(favoritePokemons);
    // }, [favoritePokemons]);

    return (
        

        // <PokemonGrid pokemons={favoritePokemons}/>
        <>
            {
                favoritePokemons.length > 0 ? (<PokemonGrid pokemons={favoritePokemons}/>) : (<NoFavorites />)
            }
        </>
        
    )
}

export const NoFavorites = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline size={100} className="text-red-500" />
            <span>No hay favoritos</span>
        </div>
    )
}