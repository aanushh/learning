import type { FC } from "react";
import PokemonBodyMeasurements from "./PokemonBodyMeasurements";
import PokemonAbilityList from "./PokemonAbilityList";
import type { PokemonAbilities } from "../../types/pokemon";

interface Props {
  abilities: PokemonAbilities[];
  height: number;
  isLoading: boolean;
  weight: number;
}

const PokemonInfoSection: FC<Props> = ({
  abilities,
  height,
  isLoading,
  weight,
}) => {
  if (isLoading) {
    return <>Loading ...</>;
  }

  return (
    <>
      <PokemonBodyMeasurements height={height} weight={weight} />
      <PokemonAbilityList abilities={abilities} />
    </>
  );
};

export default PokemonInfoSection;
