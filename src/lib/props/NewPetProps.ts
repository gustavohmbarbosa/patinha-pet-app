export type NewPetProps = {
  name: string;
  type: "CAT" | "DOG";
  race: string;
  weight?: number;
  height?: number;
  birth?: Date;
};
