import { type FC } from "react";
import PokemonSelect from "./PokemonSelect";
import GetPokemonDetailsButton from "./GetPokemonDetailsButton";

interface Props {
  formAction: (formData: FormData) => void;
}

const PokemonForm: FC<Props> = ({ formAction }) => {
  return (
    <form action={formAction}>
      <PokemonSelect />
      <GetPokemonDetailsButton />
    </form>
  );
};

export default PokemonForm;
