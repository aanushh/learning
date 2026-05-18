export interface PokemonData {
  name: string;
  url: string;
}

export interface PokemonCollection {
  count: number;
  next: string | null;
  prev: string | null;
  results: PokemonData[];
}

export interface PokemonDetails {
  abilities: PokemonAbilities[];
  height: number;
  weight: number;
}

export interface PokemonAbilities {
  ability: PokemonData;
  is_hidden: boolean;
  slot: number;
}
