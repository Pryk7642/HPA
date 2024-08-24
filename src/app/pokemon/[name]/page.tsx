"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { stat } from "fs";
import Link from "next/link";
import Image from 'next/image';


export default function Page() {
  const { name} = useParams<{ name: string}>();
  const [pokemon, setPokemon] = useState<any>(null);


  useEffect(() => {
    if (name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => res.json())
      .then((date)  => setPokemon(date));
    }
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;
//<img src={pokemon.sprites.front_default} alt={pokemon.name} />
  return (
    <div>
      <h2><Link href="/pokemon">← Back</Link></h2>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      
      <h2>Details</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Type: {pokemon.types.map((type: any) => type.type.name).join(", ")}</p>
      <p>Abilities: {pokemon.abilities.map((ability: any) => ability.ability.name).join(", ")}</p>
      
      <h2>Stats</h2>
      <ul>{pokemon.stats.map((stat: any) => (<p key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</p>))}</ul>

      <h2>Moves</h2>
      <ul> {pokemon.moves.map((move: any) => (<p key={move.move.name}>{move.move.name}</p>))}</ul>
      
    </div>
  );



}
//ในไฟล์.eslintrc.json