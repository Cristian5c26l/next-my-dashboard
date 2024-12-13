// Para llegar a esta pagina del pokemon, acceder a la url http://localhost:3000/dashboard/pokemons/nombrePokemon

import { Pokemon, PokemonsResponse } from "@/pokemons";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { name: string };
  // searchParams: { age: string; id: string;};// Contiene los parámetros que están partir de "?" de, en este caso, la URL http://localhost:3000/dashboard/pokemons/nombre?age=14&id=ID
}

// Funcion generateStaticParams se ejecuta en Build Time (npm run build)
export async function generateStaticParams() {

    const res: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`).then(res => res.json());
    
    const static151Pokemons = res.results.map(pokemon => ({
        name: pokemon.name,
    }))

    // throw new Error('Este error no debería de suceder');

    return static151Pokemons;
}// En esta función se generan los parámetros {name: string} cuando se hace npm run build para que se generen las páginas estáticas de cada pokemon. Cada página estática generada va a lucir así: /dashboard/pokemons/nombrePokemon, donde nombrePokemon será el valor de la propiedad name de cada objeto del array static151Pokemons. Recordar que, por defecto, cuando estamos en una ruta dinamica como pokemons/[name], el valor de la propiedad name de params va a ser el valor de la parte dinámica del path, que, en este caso, es [name]. POR EJEMPLO, SI ACCEDEMOS A LA URL http://localhost:3000/dashboard/pokemons/pikachu, el valor de params.name va a ser "pikachu".

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id, name } = await getPokemon(params.name);

    return {
      title: `#${id} - ${name}`, // Titulo de la pestaña de la pagina
      description: `Página del pokémon ${name}`, // Descripcion de la pagina (meta tag description)
    };
  } catch (error) {
    console.log(error);
    return {
      title: "Página del pokémon",
      description: "Voluptate ullamco duis qui consectetur.",
    };
  }
}

const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      // cache: "no-store", // TODO: cambiar esto en un futuro
      // cache: "force-cache",
      next: {
          revalidate: 60*60*30*6,
      }
    }).then((res) => res.json());

    console.log("Se cargó: ", pokemon.name);

    return pokemon;
  } catch (error) { // Este bloque se ejecuta cuando el fetch arroja un error
    console.log(error);
    notFound();// Mostrar en la URL actual (que por ejemplo seria http://localhost:3000/dashboard/pokemons/nombrePokemonQueNoExiste) el componente NotFound de src/app/dashboard/pokemons/[name]/not-found.tsx o el componente de defecto src/app/not-found.tsx
  }
};

export default async function PokemonPage({ params }: Props) {
  const pokemon = await getPokemon(params.name);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <p key={move.move.name} className="mr-2 capitalize">
                  {move.move.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Types</p>
            <div className="text-base font-medium text-navy-700 flex">
              {pokemon.types.map((type) => (
                <p key={type.slot} className="mr-2 capitalize">
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm text-gray-600">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
