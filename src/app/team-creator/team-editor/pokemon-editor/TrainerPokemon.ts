export interface TrainerPokemon {
  name: string;
  number: string;
  type1: string;
  type2: string;
  weight: number;
  IVs: number[];
  EVs: number[];
  learntMovements: string[];
  ability: string;
}
