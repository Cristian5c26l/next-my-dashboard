import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";



export const localStorageMiddleware = (state: MiddlewareAPI) => {
    return (next: Dispatch) => (action: Action) => {// El contenido de esta funcion se ejecuta antes de que por ejemplo se intente ejecutar dispatch(toggleFavorite(pokemon)). Con next(action) se continua a ejecutar toggleFavorite(pokemon) que al final de cuentas modifica el estado pokemonsReducer de la store ()

        next(action);// Permitir la ejecucion de dispatch(toggleFavorite(pokemon)) en caso de que se esté intentando ejecutar por ejemplo desde PokemonCard.tsx. toggleFavorite actualiza el estado pokemonsReducer de la store

        // ESTOS CONSOLE.LOG SE MUESTRAN EN LA CONSOLA DEL NAVEGADOR WEB.
        // console.log({ state: state.getState() });// Ver todo el state de la store (ese state lo conforma counterReducer y pokemonReducer en src/store/index.ts)
        // console.log({ favoritePokemons: state.getState().pokemonsReducer });// Ver solo el state de los pokemons favoritos (pokemonsReducer)
        // console.log({ action });// Ver action. Muestra un objeto con propiedades 'type' y 'payload'. type contendrá "pokemons/toggleFacorite" y payload contendrá un objeto con propiedades 'id' y 'name' (objeto tipo SimplePokemon que se le pasa a funcion toggleFavorite). Lo anterior es así en caso de que se esté intentando ejecutar dispatch(toggleFavorite(pokemon)) en algún lugar de la aplicación. Recordar que "pokemons" viene del name de pokemonsSlicen en src/store/pokemons/pokemons.ts y "toggleFavorite" viene de src/store/pokemons/pokemons.ts.

        if (action.type === 'pokemons/toggleFavorite') {
            // Grabar en local storage
            const { pokemonsReducer } = state.getState() as RootState; // Esto solo es para tener tipado, para que permita extraer "pokemonsReducer" (pokemonsReducer porque asi esta especificado en src/store/index.ts)
            localStorage.setItem('favorite-pokemons', JSON.stringify(pokemonsReducer));
            return;
        }

    }
}