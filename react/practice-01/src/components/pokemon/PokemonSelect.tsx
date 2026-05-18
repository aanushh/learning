import {
  startTransition,
  useActionState,
  useEffect,
  useMemo,
  type FC,
} from "react";
import Select from "../Select";
import { fetchData } from "../../api/client";
import { type PokemonCollection, type PokemonData } from "../../types/pokemon";

const PokemonSelect: FC = () => {
  const [pokemonData, dispatch, isPending] = useActionState(async () => {
    const response = await fetchData<PokemonCollection>(
      "https://pokeapi.co/api/v2/pokemon/",
    );

    return response.data?.results || [];
  }, [] as PokemonData[]);

  useEffect(() => {
    startTransition(() => {
      dispatch();
    });
  }, [dispatch]);

  const options = useMemo(
    () => pokemonData.map((pokemon) => pokemon.name) || [],
    [pokemonData],
  );

  return (
    <Select
      label="Pokemon: "
      id="pokemon"
      isLoading={isPending}
      name="pokemon"
      options={options}
    />
  );
};

export default PokemonSelect;
