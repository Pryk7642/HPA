
"use client";
import Link from "next/link";
import React, { JSXElementConstructor } from "react";


interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: Pokemon[];
}
interface Pokemon {
  name: string;
  url: string;
}

export default function Page() {
  const [pokemonData, setPokemonData] = React.useState<PokemonList>(
    {} as PokemonList
  );
  React.useEffect(() => {
    const getData = async () => {
      const result = await fetch("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.json())
        .then((res) => {
          const pokemonData: PokemonList = res as PokemonList;
          setPokemonData(pokemonData);
        })
        .catch((err) => console.error(err));
    };
    getData();
  }, []);

  const DisplayPokemonList = () => {
    if (pokemonData && pokemonData.results)
      return (
        <ul>
          {pokemonData.results.map((p) => (
            <ul>
              <Link href={"/pokemon/" + p.name}>{p.name}</Link>
            </ul>
          ))}
        </ul>
      );
    else return <p>Loading...</p>;
  };

  return (
    <>
      <h1>Pokemon</h1>
      <DisplayPokemonList />
    </>
  );
}
