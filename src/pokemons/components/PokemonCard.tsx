'use client';

import Link from "next/link";
import { SimplePokemon } from "..";
import Image from "next/image";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/pokemons/pokemons";

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {
    
  const { id, name } = pokemon;
  const isFavorite = useAppSelector(state => state.pokemonsReducer.favorites[id]);
  console.log('PokemonCard', { isFavorite }); // 1. Funcionalidad 1. Se imprime una segunda vez debido a que setInitialState genera un nuevo estado "pokemonsReducer" (donde useAppSelector(state.pokemonsReducer) lo detecta volviendo a ejecutar a partir de dicho useAppSelector las lines de codigo posteriores) el cual toma el valor de favoritesPokemonsFromLocalStorage (que es action.payload) contenido en el useEffect de LoadPokemons.tsx al ir a http://localhost:3000/dashboard/pokemons que estaría construido por app/layout.tsx (contiene LoadPokemons.tsx) -> app/dashboard/layout.tsx -> app/dashboard/pokemons/page.tsx -> PokemonGrid.tsx -> PokemonCard.tsx. 2. Funcionalidad 2. Se imprime una vez más cuando ocurre dispatch(toggleFavorite(pokemon)) desde PokemonCard.tsx. toggleFavorite actualiza el estado pokemonsReducer de la store repitiendo el proceso de que se vuelva a ejecutar useAppSelector(state.pokemonsReducer) y las lineas de codigo posteriores.
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch(toggleFavorite(pokemon));
  }

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          
            <Image
                key={id}
                alt={name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                width={100}
                      height={100}
                      priority={false}
                    //   className="mx-auto"     
                    //   mx-auto is for centering image
            />
            
                  <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{ name }</p>
          <div className="mt-5">
            <Link href={`/dashboard/pokemons/${name}`} className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100">
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
            <div className="px-4 py-2 hover:bg-gray-100 flex items-center">
                  {/* flex align-center. flex hace que cada etiqueta contenedora se vuelva una caja flexible para acomodarse en horizontal en fila empezando desde el principio (parte superior izquierda).  Con items-center, ya no empezaría desde la parte superior izquierda, sino desde la parte central izquierda (centrado en el eje vertical)*/}
              <div className="text-green-600 hover:cursor-pointer" onClick={onToggle}>
                {
                  (isFavorite && <IoHeart />) || <IoHeartOutline />
                }
              </div>
                      {/* <div className="text-green-600">
                <IoHeartOutline />
                      </div>
                <div className="text-green-600">
                <IoHeartOutline />
              </div> */}
              <div className="pl-3">
                <p className="text-sm font-medium text-gray-800 leading-none">
                {
                  (isFavorite && 'Es favorito') || 'No es favorito'
                }
                </p>
                <p className="text-xs text-gray-500">Click para cambiar</p>
              </div>
          </div>
          
        </div>

        
      </div>
    </div>
  );
};
