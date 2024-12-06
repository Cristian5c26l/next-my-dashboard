import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";
// import Image from "next/image";

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
    // const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    // const data = await res.json();

    const res: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(res => res.json());

    const pokemons = res.results.map(pokemon => ({
        // id: pokemon.url.split('/')[pokemon.url.split('/').length - 2],
        id: pokemon.url.split('/').at(-2)!,// "!" indica que nunca será nulo el penultimo elemento (-2) del arreglo pokemon.url.split('/')
        name: pokemon.name,
    }))

    // throw new Error('Este error no debería de suceder');

    return pokemons;
}

export default async function PokemonsPage() {

    const pokemons = await getPokemons(151);

    return (
        <div className="flex flex-col">

            <span className="text-5xl my-2">Listado de Pókemons <small>estático</small></span>

            <PokemonGrid pokemons={pokemons}/>
        </div>
    );
}