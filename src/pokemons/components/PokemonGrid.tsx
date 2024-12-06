// import Image from "next/image";
import { SimplePokemon } from "..";
import { PokemonCard } from "./PokemonCard";

interface Props {
    pokemons: SimplePokemon[];
}

export const PokemonGrid = ({pokemons}: Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
        {/* <Image
            alt="Nombre del pokemon"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${1}.svg`}
            width={100}
            height={100}
        /> */}
        {
              pokemons.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
        }
    </div>
  )
}
