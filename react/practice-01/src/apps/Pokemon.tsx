import { useActionState, useMemo, type FC } from "react";
import PokemonForm from "../components/pokemon/PokemonForm";
import type { PokemonDetails } from "../types/pokemon";
import PokemonInfoSection from "../components/pokemon/PokemonInfoSection";
import { fetchData } from "../api/client";

import "../styles/pokemon.css";

const PokemonApp: FC = () => {
  const [pokemonDetails, action, isPending] = useActionState(
    async (_: PokemonDetails, formData: FormData) => {
      const pokemonName = formData.get("pokemon") || "";
      const response = await fetchData<PokemonDetails>(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );

      return response.data || ({} as PokemonDetails);
    },
    {} as PokemonDetails,
  );

  const abilities = useMemo(() => {
    if (!pokemonDetails.abilities || pokemonDetails.abilities.length === 0) {
      return [];
    }

    return pokemonDetails.abilities.filter(({ is_hidden }) => !is_hidden);
  }, [pokemonDetails]);

  const { height, weight } = pokemonDetails;

  return (
    <div className="pokemon-wrapper">
      <h1>Pokemon App</h1>

      <PokemonForm formAction={action} />

      <PokemonInfoSection
        abilities={abilities}
        height={height}
        isLoading={isPending}
        weight={weight}
      />
    </div>
  );
};

export default PokemonApp;
