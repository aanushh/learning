import type { FC } from "react";

interface Props {
  height: number;
  weight: number;
}

const PokemonBodyMeasurements: FC<Props> = ({ height, weight }) => {
  if (!height && !weight) {
    return null;
  }

  return (
    <section>
      <h2>Body measurements</h2>

      <div className="pokemon-body-measurements">
        {height ? <span>Height: {height}</span> : null}
        {weight ? <span>Weight: {weight}</span> : null}
      </div>
    </section>
  );
};

export default PokemonBodyMeasurements;
