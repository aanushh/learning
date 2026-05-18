import type { FC } from "react";
import { useFormStatus } from "react-dom";
import Button from "../Button";

const GetPokemonDetailsButton: FC = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      label={pending ? "Loading..." : "Load details"}
      disabled={pending}
    />
  );
};

export default GetPokemonDetailsButton;
