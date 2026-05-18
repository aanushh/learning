import type { FC } from "react";
import type { PokemonAbilities } from "../../types/pokemon";

interface Props {
  abilities: PokemonAbilities[];
}

const PokemonAbilityList: FC<Props> = ({ abilities }) => {
  if (abilities?.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>Abilities</h2>

      <ul>
        {abilities.map(({ ability }) => (
          <li key={ability.name}>{ability.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default PokemonAbilityList;
