import { PokemonGrid } from "@/pokemons";
// import Image from "next/image";


export const metadata = {
    title: 'Favoritos',
    description: 'Et do officia do sunt quis officia aliqua labore amet magna aliquip exercitation.',
}

export default async function FavoritePokemonsPage() {


    return (
        <div className="flex flex-col">

            <span className="text-5xl my-2">Pokémons Favoritos <small className="text-blue-500">Global State</small></span>

            <PokemonGrid pokemons={[]}/>
        </div>
    );
}