import { SimplePokemon } from '@/pokemons';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonsState {
    favorites: { [key: string]: SimplePokemon };
}

// const getInitialState = (): PokemonsState => {
    
//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');

//     return favorites;
// }

// Error de Referencia a localStorage porque al estar en una app de next (una app generada del lado del servidor), no se puede acceder al objeto localStorage del navegador web,
// const getInitialState = (): PokemonsState => {
    
//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');

//     return favorites;
// }

// const getInitialState = (): PokemonsState => {
    
//     // if (typeof localStorage === 'undefined') return {};

//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');

//     return favorites;
// }

// Error de hidratacion. El error de react-hydration-error ocurre porque en aplicaciones de Next.js, el lado del servidor no tiene acceso al objeto window o al almacenamiento local (localStorage). Por lo tanto, el código que depende de localStorage no debe ejecutarse en el lado del servidor, ya que genera inconsistencias entre el HTML renderizado en el servidor y el que se renderiza en el cliente.
// const getInitialState = (): PokemonsState => {
//     // Evita acceder a localStorage en el servidor
//     if (typeof window === 'undefined') {
//         return {}; // Estado inicial vacío en el servidor
//     }

//     // Accede a localStorage en el cliente
//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
//     return favorites;
// };

// const getInitialState = (): PokemonsState => ({})

const initialState: PokemonsState = {
    // '1': {id: '1', name: 'bulbasaur'},
    // '3': {id: '3', name: 'venusaur'},
    // '5': {id: '5', name: 'Charmeleon'},
    // ...getInitialState(),
    favorites: {}
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
    reducers: {
        setFavoritePokemons(state, action: PayloadAction<{ [key: string]: SimplePokemon }>) {
            state.favorites = action.payload;
        },
        toggleFavorite(state, action: PayloadAction<SimplePokemon>) {//state es el initialState y action.payload contiene un objeto tipo SimplePokemon
            // if (state[action.payload.id]) {
            //     delete state[action.payload.id];// En este punto, se muta el state y genera al mismo tiempo un nuevo state, para que así, se avise a cualquier lugar de la aplicación donde se esté ocupando el state 
            //     return;
            // }


            // state[action.payload.id] = action.payload;
            // Actualizar state de los pokemons favoritos
            const pokemon = action.payload;
            const { id } = pokemon;

            if (!!state.favorites[id]) {
                delete state.favorites[id];
            } else {
                state.favorites[id] = pokemon;
            }

            // TODO: No se debe de hacer en Redux
            localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites));// Serialización de un objeto a un string

        },
        // setInitialState(state, action: PayloadAction<PokemonsState>) {
        //     // console.log({ payload: action.payload });
        //     // state = action.payload;
        //     return action.payload;

        // }
  }
});

export const {toggleFavorite, setFavoritePokemons} = pokemonsSlice.actions

export default pokemonsSlice.reducer